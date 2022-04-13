import React, { useEffect, useState } from 'react';
import { regex } from 'config';
import './RegistrationForm.scss';

const TextField = React.lazy(() => import('components/elements/TextField'));

const nameValidator = new RegExp(regex.nameValidator);
const passwordValidator = new RegExp(regex.passwordValidator);

const RegistrationForm = ({
  userDetails,
  setUserDetails,
  isInvalidState,
  toggleInputInvalidationState,
}) => {
  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'username':
        if (!nameValidator.test(value)) {
          toggleInputInvalidationState({
            inputName: name,
            errorMessage: 'Please enter a valid input',
            isInvalid: true,
          });
          return;
        }
        break;
      case 'password':
        if (!passwordValidator.test(value)) {
          toggleInputInvalidationState({
            inputName: name,
            errorMessage: 'Please enter a valid password',
            isInvalid: true,
          });
          return;
        }
        break;
      case 'confirmPassword':
        if (value !== userDetails?.password) {
          toggleInputInvalidationState({
            inputName: name,
            errorMessage: 'Please enter correct password',
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

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    const draftFormState = { ...userDetails };
    draftFormState[name] = value;

    setUserDetails(draftFormState);
  };

  return (
    <>
      <div className="registration-form_header">Registration - Form</div>
      <div className="registration-form_body">
        <TextField
          name="firstName"
          value={userDetails?.['firstName'] ?? ''}
          placeholder="Enter your first name"
          error={isInvalidState.hasOwnProperty('firstName')}
          helperText={isInvalidState?.['firstName'] ?? ''}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
        />
        <TextField
          name="lastName"
          value={userDetails?.['lastName'] ?? ''}
          placeholder="Enter your last name"
          error={isInvalidState.hasOwnProperty('lastName')}
          helperText={isInvalidState?.['lastName'] ?? ''}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
        />
      </div>
      <TextField
        name="username"
        value={userDetails?.['username'] ?? ''}
        placeholder="Enter username"
        error={isInvalidState.hasOwnProperty('username')}
        helperText={isInvalidState?.['username'] ?? ''}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
      <TextField
        name="password"
        type="password"
        value={userDetails?.['password'] ?? ''}
        placeholder="Enter password"
        error={isInvalidState.hasOwnProperty('password')}
        helperText={isInvalidState?.['password'] ?? ''}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
      <TextField
        name="confirmPassword"
        type="password"
        value={userDetails?.['confirmPassword'] ?? ''}
        placeholder="Confirm password"
        error={isInvalidState.hasOwnProperty('confirmPassword')}
        helperText={isInvalidState?.['confirmPassword'] ?? ''}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
    </>
  );
};

export default RegistrationForm;
