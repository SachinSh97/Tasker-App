import {
  UPDATE_TODO_LIST,
  UPDATE_INPROGRESS_LIST,
  UPDATE_ASSIGNED_LIST,
  UPDATE_DONE_LIST,
  CLEAR_TASK_BOARD,
  UPDATE_TASK_BOARD,
} from './actionTypes';

export const updateTodoListAction = (payload) => ({
  type: UPDATE_TODO_LIST,
  todoTask: payload?.taskDetails ?? {},
  todoOpt: payload?.operation ?? {},
});

export const updateAssignedListAction = (payload) => ({
  type: UPDATE_ASSIGNED_LIST,
  assignedTask: payload?.taskDetails ?? {},
  assignedOpt: payload?.operation ?? {},
});

export const updateInprogressListAction = (payload) => ({
  type: UPDATE_INPROGRESS_LIST,
  inprogressTask: payload?.taskDetails ?? {},
  inprogressOpt: payload?.operation ?? {},
});

export const updateDoneListAction = (payload) => ({
  type: UPDATE_DONE_LIST,
  doneTask: payload?.taskDetails ?? {},
  doneOpt: payload?.operation ?? {},
});

export const updateTaskboardAction = (payload) => ({
  type: UPDATE_TASK_BOARD,
  taskboard: payload,
});

export const clearTaskBoardAction = () => ({ type: CLEAR_TASK_BOARD });
