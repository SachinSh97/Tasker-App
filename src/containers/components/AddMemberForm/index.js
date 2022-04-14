import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from '@mui/icons-material/Check';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getRandomColor } from 'utils/helper';
import './AddMemberForm.scss';

const Button = React.lazy(() => import('components/elements/Button'));
const TextField = React.lazy(() => import('components/elements/TextField'));

const AddMemberForm = ({ members, setMembers }) => {
  const [membersDetail, setMembersDetails] = useState([]);

  useEffect(() => {
    const draftMembers = [
      ...members,
      {
        id: uuidv4(),
        firstName: '',
        lastName: '',
        edit: true,
        color: getRandomColor(),
      },
    ];
    setMembersDetails(draftMembers);
  }, []);

  const handleAddNewMember = () => {
    const draftMembers = [
      ...membersDetail,
      {
        id: uuidv4(),
        firstName: '',
        lastName: '',
        edit: true,
        color: getRandomColor(),
      },
    ];
    setMembersDetails(draftMembers);
  };

  const handleDeleteMember = (memberId) => {
    const draftMembers = membersDetail?.filter(
      (member) => member?.id !== memberId,
    );
    setMembersDetails(draftMembers);
    setMembers(draftMembers);
  };

  const handleEditMember = (memberId) => {
    const draftMembers = [...membersDetail];

    draftMembers?.forEach((member) => {
      if (member?.id === memberId) {
        member['edit'] = true;
      }
    });

    setMembersDetails(draftMembers);
  };

  const handleSubmit = (memberId) => {
    const draftMembers = [...membersDetail];

    draftMembers?.forEach((member) => {
      if (
        member?.id === memberId &&
        member?.firstName?.length !== 0 &&
        member?.lastName?.length !== 0
      ) {
        delete member['edit'];
      }
    });

    setMembersDetails(draftMembers);
    setMembers(draftMembers);
  };

  const handleOnChange = (event, memberId) => {
    const { name, value } = event.target;
    const draftMembers = [...membersDetail];

    draftMembers?.forEach((member) => {
      if (member?.id === memberId) {
        member[name] = value;
      }
    });

    setMembersDetails(draftMembers);
  };

  const renderMembers = (membersDetail) =>
    membersDetail?.map((member) =>
      !member?.edit ? (
        <div className="member-details" key={member?.id ?? ''}>
          <span className="name">
            {`${member?.firstName ?? ''} ${member?.lastName ?? ''}`}
          </span>
          <span className="atnBtn">
            <EditIcon onClick={() => handleEditMember(member?.id ?? '')} />
            <RemoveCircleIcon
              onClick={() => handleDeleteMember(member?.id ?? '')}
            />
          </span>
        </div>
      ) : (
        renderMemberCreationForm(member)
      ),
    );

  const renderMemberCreationForm = (member) => (
    <div className="form" key={member?.id}>
      <div className="form_fields">
        <TextField
          name="firstName"
          value={member?.['firstName'] ?? ''}
          placeholder="Enter first name"
          onChange={(event) => handleOnChange(event, member?.id)}
        />
        <TextField
          name="lastName"
          value={member?.['lastName'] ?? ''}
          placeholder="Enter last name"
          onChange={(event) => handleOnChange(event, member?.id)}
        />
      </div>
      <div className="form_atnBtn">
        <CheckIcon onClick={() => handleSubmit(member?.id ?? '')} />
        <RemoveCircleIcon
          onClick={() => handleDeleteMember(member?.id ?? '')}
        />
      </div>
    </div>
  );
  return (
    <>
      <div className="add-member-form_header">Add Members - Form </div>
      <div className="add-member-form_body">{renderMembers(membersDetail)}</div>
      <Button
        rootClass="add-member-form_atnBtn"
        fullWidth={true}
        content={<AddIcon />}
        onClick={handleAddNewMember}
      />
    </>
  );
};

export default AddMemberForm;
