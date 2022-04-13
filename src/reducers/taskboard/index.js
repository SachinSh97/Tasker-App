import {
  UPDATE_TODO_LIST,
  UPDATE_ASSIGNED_LIST,
  UPDATE_INPROGRESS_LIST,
  UPDATE_DONE_LIST,
} from 'actions/taskboard/actionTypes';

const initialState = {
  todoTasks: [],
  assignedTasks: [],
  inprogressTasks: [],
  doneTasks: [],
};

const taskboardReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TODO_LIST:
      const { todoTask, todoOpt } = action;

      let draftTodoTasks =
        state?.todoTasks?.filter((task) => task?.id !== todoTask?.id) ?? [];
      if (['UPDATE', 'CREATE'].includes(todoOpt)) {
        draftTodoTasks.push(todoTask);
      }

      return { ...state, todoTasks: [...draftTodoTasks] };
    case UPDATE_ASSIGNED_LIST:
      const { assignedTask, assignedOpt } = action;

      let draftAssignedTasks =
        state?.assignedTasks?.filter((task) => task?.id !== assignedTask?.id) ??
        [];
      if (['UPDATE', 'CREATE'].includes(assignedOpt)) {
        draftAssignedTasks.push(assignedTask);
      }

      return {
        ...state,
        assignedTasks: [...draftAssignedTasks],
      };
    case UPDATE_INPROGRESS_LIST:
      const { inprogressTask, inprogressOpt } = action;

      let draftInprogressTasks =
        state?.inprogressTasks?.filter(
          (task) => task?.id !== inprogressTask?.id,
        ) ?? [];
      if (['UPDATE', 'CREATE'].includes(inprogressOpt)) {
        draftInprogressTasks.push(inprogressTask);
      }

      return {
        ...state,
        inprogressTasks: [...draftInprogressTasks],
      };
    case UPDATE_DONE_LIST:
      const { doneTask, doneOpt } = action;

      let draftDoneTasks =
        state?.doneTasks?.filter((task) => task?.id !== doneTask?.id) ?? [];
      if (['UPDATE', 'CREATE'].includes(doneOpt)) {
        draftDoneTasks.push(doneTask);
      }

      return { ...state, doneTasks: [...draftDoneTasks] };
    default:
      return state;
  }
};

export default taskboardReducers;
