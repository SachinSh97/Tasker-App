import React, { Suspense, useEffect, useState } from 'react';
import './CreateTaskDialog.scss';

const Loader = React.lazy(() => import('components/elements/Loader'));
const TextField = React.lazy(() => import('components/elements/TextField'));
const Select = React.lazy(() => import('components/elements/Select'));
const Button = React.lazy(() => import('components/elements/Button'));
const Dialog = React.lazy(() => import('components/Dialog'));

const CreateTaskDialog = ({
  open,
  initialState,
  assigneeList,
  handleClose,
  handleSubmit,
}) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    assignee: '',
  });
  const [isInvalidState, setIsInvalid] = useState({});

  useEffect(() => {
    if (Object.keys(initialState)?.length > 0) {
      const draftFormState = {
        ...initialState,
        assignee: initialState?.assignee?.id ?? '',
      };
      setFormState(draftFormState);
    }
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const draftFormState = { ...formState };
    const draftIsInvalidState = { ...isInvalidState };
    draftFormState[name] = value;
    delete draftIsInvalidState['assignee'];

    setIsInvalid(draftIsInvalidState);
    setFormState(draftFormState);
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        if (value?.length === 0) {
          toggleInputInvalidationState({
            inputName: name,
            errorMessage: 'Please enter the task title',
            isInvalid: true,
          });
          return;
        }
        break;
      case 'assignee':
        if (value?.length === 0) {
          toggleInputInvalidationState({
            inputName: name,
            errorMessage: 'Please select the assignee',
            isInvalid: true,
          });
          return;
        }
        break;
      default:
        break;
    }
    toggleInputInvalidationState({
      inputName: name,
      errorMessage: '',
      isInvalid: false,
    });
  };

  // Update the component state to reflect input invalidity
  const toggleInputInvalidationState = ({
    inputName,
    errorMessage,
    isInvalid,
  }) => {
    const draftIsInvalidState = { ...isInvalidState };

    isInvalid
      ? setIsInvalid({ ...draftIsInvalidState, [inputName]: errorMessage })
      : draftIsInvalidState.hasOwnProperty(inputName) &&
        delete draftIsInvalidState[inputName] &&
        setIsInvalid(draftIsInvalidState);
  };

  const handleOnSubmit = () => {
    const draftIsInvalidState = { ...isInvalidState };
    if (Object.keys(draftIsInvalidState)?.length > 0) {
      return;
    }
    if (formState?.title?.length === 0) {
      draftIsInvalidState['title'] = 'Please enter title';
      setIsInvalid(draftIsInvalidState);
      return;
    }
    if (formState?.assignee?.length === 0) {
      draftIsInvalidState['assignee'] = 'Please select assignee';
      setIsInvalid(draftIsInvalidState);
      return;
    }

    handleSubmit(formState);
  };

  const renderAssigneeOptions = () =>
    assigneeList?.map((assignee) => ({
      value: assignee?.id ?? '',
      label: `${assignee?.firstName ?? ''} ${assignee?.lastName ?? ''}`,
    }));

  const renderFooter = () => (
    <div className="create-task_atn">
      <Button variant="text" content="Cancel" onClick={handleClose} />
      <Button content="Submit" onClick={handleOnSubmit} />
    </div>
  );

  return (
    <Dialog
      classes={{ paper: 'create-task' }}
      open={open}
      title={`${initialState ? 'Edit' : 'Create'} Task`}
      footer={renderFooter()}
      handleClose={handleClose}
    >
      <Suspense fallback={<Loader />}>
        <div className="create-task_body">
          <TextField
            name="title"
            type="text"
            value={formState?.['title'] ?? ''}
            placeholder="Task title"
            error={isInvalidState.hasOwnProperty('title')}
            helperText={isInvalidState?.['title'] ?? ''}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
          />
          <Select
            name="assignee"
            value={formState?.['assignee'] ?? ''}
            options={renderAssigneeOptions()}
            label="Select Assignee"
            error={isInvalidState.hasOwnProperty('assignee')}
            helperText={isInvalidState?.['assignee']}
            handleChange={handleOnChange}
          />
          <TextField
            name="description"
            value={formState?.['description'] ?? ''}
            placeholder="Description ... "
            multiline={true}
            maxRows="4"
            onChange={handleOnChange}
          />
        </div>
      </Suspense>
    </Dialog>
  );
};

export default CreateTaskDialog;
