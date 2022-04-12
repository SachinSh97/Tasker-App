import React from 'react';
import './TaskCard.scss';

const Card = React.lazy(() => import('components/elements/Card'));
const Avatar = React.lazy(() => import('components/elements/Avatar'));

const TaskCard = ({ title, description, assignee, color }) => {
  return (
    <Card classname="task-card">
      <span className="task-card_header" title={title}>
        {title}
      </span>
      <span className="task-card_description">{description}</span>
      <span className="task-card_assignee">
        <Avatar name={assignee?.name} color={assignee?.color} />
      </span>
    </Card>
  );
};

export default TaskCard;
