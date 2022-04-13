import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './TaskCard.scss';

const Card = React.lazy(() => import('components/elements/Card'));
const Avatar = React.lazy(() => import('components/elements/Avatar'));

const TaskCard = ({
  id,
  title,
  description,
  assignee,
  status,
  handleEditTask,
  handleDeleteTask,
}) => {
  const handleonDeleteTask = (event, taskDetails) => {
    event.stopPropagation();
    handleDeleteTask(taskDetails);
  };
  const taskDetails = { id, title, description, assignee, status };
  return (
    <Card classname="task-card" onClick={() => handleEditTask(taskDetails)}>
      <span className="task-card_header">
        <span className="title" title={title}>
          {title}
        </span>
        <RemoveCircleIcon
          onClick={(event) => handleonDeleteTask(event, taskDetails)}
        />
      </span>
      <span className="task-card_description" title={description}>
        {description}
      </span>
      <span className="task-card_assignee">
        <Avatar
          name={`${assignee?.firstName} ${assignee?.lastName}`}
          color={assignee?.color ?? '#ec7979'}
        />
      </span>
    </Card>
  );
};

export default TaskCard;
