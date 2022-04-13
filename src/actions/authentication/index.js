import { REGISTER_USER, UNRESGISTER_USER } from './actionTypes';

export const registerUserAction = (requestBody) => ({
  type: REGISTER_USER,
  authentication: requestBody,
});

export const unregisterUserAction = () => ({
  type: UNRESGISTER_USER,
});
