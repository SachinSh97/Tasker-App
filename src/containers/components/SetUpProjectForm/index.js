import React from 'react';
import './SetUpProjectForm.scss';

const TextField = React.lazy(() => import('components/elements/TextField'));

const SetUpProjectForm = ({
  projectDetails,
  isInvalidState,
  setProjectDetails,
  toggleInputInvalidationState,
}) => {
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const draftProjectDetails = { ...projectDetails };

    draftProjectDetails[name] = value;
    setProjectDetails(draftProjectDetails);
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'project':
        if (value?.length === 0) {
          toggleInputInvalidationState({
            inputName: name,
            errorMessage: 'Please enter project name',
            isInvalid: true,
          });
          return;
        }
      default:
        break;
    }
    toggleInputInvalidationState({
      inputName: name,
      errorMessage: '',
      isInvalid: false,
    });
  };

  return (
    <>
      <div className="setup-project-form_header">Setup Project - Form</div>
      <div className="setup-project-form_body">
        <TextField
          name="project"
          value={projectDetails?.project ?? ''}
          placeholder="Enter project name"
          error={isInvalidState.hasOwnProperty('project')}
          helperText={isInvalidState?.['project'] ?? ''}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
        />
        <TextField
          name="description"
          value={projectDetails?.description ?? ''}
          placeholder="Description ... "
          multiline={true}
          maxRows="4"
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};

export default SetUpProjectForm;
