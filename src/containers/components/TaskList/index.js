import React, { Suspense } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import './TaskList.scss';

const Loader = React.lazy(() => import('components/elements/Loader'));
const TaskCard = React.lazy(() => import('components/TaskCard'));
const Button = React.lazy(() => import('components/elements/Button'));

const TaskList = ({
  taskListType,
  taskList,
  assigneeList,
  handleEditTask,
  handleDeleteTask,
  handleCreateTask,
}) => {
  const renderTaskList = (taskList) =>
    taskList?.map((task, index) => (
      <TaskCard
        key={index}
        index={index}
        {...task}
        assignee={assigneeList?.find(
          (assignee) => assignee?.id == task?.assignee,
        )}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    ));

  return (
    <Suspense fallback={<Loader />}>
      <Droppable key={taskListType} droppableId={taskListType?.value}>
        {(provided, snapshot) => (
          <div
            className="task-list"
            ref={provided?.innerRef}
            {...provided?.droppableProps}
          >
            <div className="task-list_header">
              <span className="task-list_header_list-type">
                {taskListType?.label}
              </span>
              <span className="task-list_header_task-count">
                {taskList?.length ?? 0}
              </span>
            </div>
            <Button
              rootClass="task-list_atnBtn"
              fullWidth={true}
              content={<AddIcon />}
              onClick={() => handleCreateTask(taskListType?.value)}
            />
            {renderTaskList(taskList)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Suspense>
  );
};

export default TaskList;
