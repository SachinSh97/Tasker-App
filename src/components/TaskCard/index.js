import React from 'react';
import Proptypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
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
  index,
  handleEditTask,
  handleDeleteTask,
}) => {
  const handleonDeleteTask = (event, taskDetails) => {
    event.stopPropagation();
    handleDeleteTask(taskDetails);
  };
  const taskDetails = { id, title, description, assignee, status };
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            classname="task-card"
            onClick={() => handleEditTask(taskDetails)}
          >
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
        </div>
      )}
    </Draggable>
  );
};

TaskCard.defaultProps = {
  id: '',
  title: '',
  description: '',
  assignee: {},
  status: '',
  index: NaN,
  handleEditTask: () => {},
  handleDeleteTask: () => {},
};

TaskCard.propTypes = {
  id: Proptypes.string,
  title: Proptypes.string,
  description: Proptypes.string,
  assignee: Proptypes.object,
  status: Proptypes.string,
  index: Proptypes.number,
  handleEditTask: Proptypes.func,
  handleDeleteTask: Proptypes.func,
};

export default TaskCard;
