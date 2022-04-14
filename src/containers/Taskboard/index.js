import React, { useEffect, useState, Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { containers } from 'routes';
import { taskStatus, CONTEXT, storage } from 'config';
import { getItem, setItem, removeItem } from 'utils/storage';
import {
  updateTodoListAction,
  updateAssignedListAction,
  updateInprogressListAction,
  updateDoneListAction,
  updateTaskboardAction,
  clearTaskBoardAction,
} from 'actions/taskboard';
import { unregisterUserAction } from 'actions/authentication';
import './Taskboard.scss';

//components
const Loader = React.lazy(() => import('components/elements/Loader'));
const Header = React.lazy(() => import('components/Header'));
const TaskList = React.lazy(() => import('containers/components/TaskList'));
const CreateTaskDialog = React.lazy(() =>
  import('containers/components/CreateTaskDialog'),
);

const Taskboard = ({
  user,
  project,
  members,
  todoTasks,
  assignedTasks,
  inprogressTasks,
  doneTasks,
  history,
  actions,
}) => {
  const [openTaskCreationDialog, setOpenTaskCreationDialog] = useState(false);
  const [openTaskType, setOpenTaskType] = useState('');
  const [selectedTask, setSelectedTask] = useState({});
  const [assigneeId, setAssigneeId] = useState('');
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (Object.keys(user)?.length === 0) {
      history?.push(`${CONTEXT}/${containers.register}`);
    }
  }, []);

  const handleCloseTaskCreationDialog = () => {
    setOpenTaskType('');
    setSelectedTask({});
    setOpenTaskCreationDialog(false);
  };

  const handleOpenTaskCreationDialog = (type) => {
    setOpenTaskType(type);
    setOpenTaskCreationDialog(true);
  };

  const handleCreateTask = (taskDetails) => {
    let requestBody;
    if (taskDetails?.hasOwnProperty('id')) {
      requestBody = { taskDetails, operation: 'UPDATE' };
    } else {
      requestBody = {
        taskDetails: { ...taskDetails, status: openTaskType, id: uuidv4() },
        operation: 'CREATE',
      };
    }
    handleDispatchAction(requestBody, openTaskType);
    setOpenTaskCreationDialog(false);
    setOpenTaskType('');
    setSelectedTask({});
  };

  const handleDispatchAction = (requestBody, taskType) => {
    switch (taskType) {
      case 'TODO':
        actions?.updateTodoList(requestBody);
        break;
      case 'ASN':
        actions?.updateAssignedList(requestBody);
        break;
      case 'IP':
        actions?.updateInprogressList(requestBody);
        break;
      case 'DN':
        actions?.updateDoneList(requestBody);
        break;
      default:
        break;
    }
  };

  const handleEditTask = (taskDetails) => {
    setSelectedTask(taskDetails);
    setOpenTaskType(taskDetails?.status);
    setOpenTaskCreationDialog(true);
  };

  const handleDeleteTask = (taskDetails) => {
    const requestBody = { taskDetails, operation: 'DELETE' };
    handleDispatchAction(requestBody, taskDetails?.status);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    let draftTaskboard = {
      todoTasks,
      assignedTasks,
      inprogressTasks,
      doneTasks,
    };

    if (source?.droppableId === destination?.droppableId) {
      let taskList = Array.from(getTasksList(source?.droppableId));
      const [removed] = taskList.splice(source?.index, 1);
      taskList.splice(destination?.index, 0, removed);
      draftTaskboard = updateTaskboard(
        draftTaskboard,
        source?.droppableId,
        taskList,
      );
    } else {
      let sourceTaskList = Array.from(getTasksList(source?.droppableId));
      let destinationTaskList = Array.from(
        getTasksList(destination?.droppableId),
      );
      const [removed] = sourceTaskList.splice(source.index, 1);
      removed['status'] = destination?.droppableId;
      destinationTaskList.splice(destination.index, 0, removed);
      draftTaskboard = updateTaskboard(
        draftTaskboard,
        source?.droppableId,
        sourceTaskList,
      );
      draftTaskboard = updateTaskboard(
        draftTaskboard,
        destination?.droppableId,
        destinationTaskList,
      );
    }

    actions?.updateTaskboard(draftTaskboard);
  };

  const getTasksList = (type) => {
    switch (type) {
      case 'TODO':
        return todoTasks;
      case 'ASN':
        return assignedTasks;
      case 'IP':
        return inprogressTasks;
      case 'DN':
        return doneTasks;
      default:
        break;
    }
  };

  const updateTaskboard = (taskBoard, type, taskList) => {
    const result = { ...taskBoard };
    switch (type) {
      case 'TODO':
        result['todoTasks'] = taskList;
        break;
      case 'ASN':
        result['assignedTasks'] = taskList;
        break;
      case 'IP':
        result['inprogressTasks'] = taskList;
        break;
      case 'DN':
        result['doneTasks'] = taskList;
        break;
      default:
        break;
    }
    return result;
  };

  const handleUnregister = () => {
    removeItem(storage);
    actions?.unregisterUser();
    actions?.clearTaskBoard();
    history?.push(`${CONTEXT}/${containers.register}`);
  };

  const renderTasks = (type, assigneeId) => {
    let taskList = [];
    switch (type) {
      case 'TODO':
        taskList = [...todoTasks];
        break;
      case 'ASN':
        taskList = [...assignedTasks];
        break;
      case 'IP':
        taskList = [...inprogressTasks];
        break;
      case 'DN':
        taskList = [...doneTasks];
        break;
      default:
        break;
    }
    if (assigneeId?.length > 0) {
      taskList = taskList?.filter((task) => task?.assignee === assigneeId);
    }
    if (searchString?.length > 0) {
      taskList = taskList?.filter((task) =>
        task?.title?.toUpperCase()?.includes(searchString?.toUpperCase()),
      );
    }
    return taskList;
  };

  return (
    <div className="task">
      <Suspense fallback={<Loader />}>
        <Header
          user={user}
          project={project}
          members={members}
          assigneeId={assigneeId}
          setAssigneeId={setAssigneeId}
          handleSearchData={setSearchString}
          handleUnregister={handleUnregister}
        />
        <div className="task-board">
          <DragDropContext onDragEnd={handleDragEnd}>
            {taskStatus?.map((status, index) => (
              <TaskList
                key={`${status?.value}-${index}`}
                taskListType={status}
                assigneeList={[user, ...members]}
                taskList={renderTasks(status?.value, assigneeId)}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
                handleCreateTask={() =>
                  handleOpenTaskCreationDialog(status?.value ?? '')
                }
              />
            ))}
          </DragDropContext>
        </div>
        {openTaskCreationDialog && (
          <CreateTaskDialog
            open={openTaskCreationDialog}
            initialState={Object.keys(selectedTask)?.length > 0 && selectedTask}
            assigneeList={[user, ...members]}
            handleClose={handleCloseTaskCreationDialog}
            handleSubmit={handleCreateTask}
          />
        )}
      </Suspense>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state?.authentication?.user ?? {},
  members: state?.authentication?.members ?? [],
  project: state?.authentication?.project ?? {},
  todoTasks: state?.taskboard?.todoTasks ?? [],
  assignedTasks: state?.taskboard?.assignedTasks ?? [],
  inprogressTasks: state?.taskboard?.inprogressTasks ?? [],
  doneTasks: state?.taskboard?.doneTasks ?? [],
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      updateTodoList: updateTodoListAction,
      updateAssignedList: updateAssignedListAction,
      updateInprogressList: updateInprogressListAction,
      updateDoneList: updateDoneListAction,
      unregisterUser: unregisterUserAction,
      updateTaskboard: updateTaskboardAction,
      clearTaskBoard: clearTaskBoardAction,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Taskboard);
