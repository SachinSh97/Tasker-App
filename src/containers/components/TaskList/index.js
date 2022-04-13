import React, { Suspense } from 'react';
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
    taskList?.map((task) => (
      <TaskCard
        {...task}
        assignee={assigneeList?.find(
          (assignee) => assignee?.id == task?.assignee,
        )}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    )) ?? [];

  return (
    <Suspense fallback={<Loader />}>
      <div className="task-list">
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
      </div>
    </Suspense>
  );
};

export default TaskList;
