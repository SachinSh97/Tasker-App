import React from 'react';
import { taskStatus } from 'config';
import './Taskboard.scss';

const TaskList = React.lazy(() => import('containers/components/TaskList'));

const Taskboard = () => {
  const renderTasks = () => {};
  return (
    <div className="task-board">
      {taskStatus?.map((status, index) => (
        <TaskList
          key={`${status?.value}-${index}`}
          taskListType={status}
          taskList={renderTasks()}
        />
      ))}
    </div>
  );
};

export default Taskboard;
