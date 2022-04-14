import React from 'react';
import Proptypes from 'prop-types';
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.scss';

const Avatar = React.lazy(() => import('components/elements/Avatar'));
const SearchBox = React.lazy(() => import('components/SearchBox'));

const Header = ({
  user,
  project,
  members,
  assigneeId,
  handleUnregister,
  handleSearchData,
  setAssigneeId,
}) => {
  const allMembers = [{ ...user }, ...members];

  const handleSetAssigneeId = (memberId) => {
    setAssigneeId(memberId !== assigneeId ? memberId : '');
  };

  return (
    <div className="taskboard-header">
      <div className="taskboard-header_search-section">
        <SearchBox
          placeholder="Search tasks by name"
          onFetchData={handleSearchData}
        />
        {user && (
          <div className="user">
            <span className="name">
              {`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
            </span>
            <LogoutIcon onClick={handleUnregister} />
          </div>
        )}
      </div>
      <div className="taskboard-header_filter-section">
        <span className="title">{project?.project ?? ''}</span>
        <span className="members">
          {allMembers?.map((member, index) => (
            <Avatar
              key={index}
              active={member?.id === assigneeId}
              name={`${member?.firstName ?? ''} ${member?.lastName ?? ''}`}
              color={member?.color ?? ''}
              onClick={() => handleSetAssigneeId(member?.id)}
            />
          ))}
        </span>
      </div>
    </div>
  );
};

Header.defaultProps = {
  user: {},
  project: {},
  members: [],
  assigneeId: '',
  handleUnregister: () => {},
  handleSearchData: () => {},
  setAssigneeId: () => {},
};

Header.propTypes = {
  user: Proptypes.object,
  project: Proptypes.object,
  members: Proptypes.array,
  assigneeId: Proptypes.string,
  handleUnregister: Proptypes.func,
  handleSearchData: Proptypes.func,
  setAssigneeId: Proptypes.func,
};

export default Header;
