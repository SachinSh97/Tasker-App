export const CONTEXT = '/taskboard';

export const taskStatus = [
  { label: 'To do', value: 'TODO' },
  { label: 'Assigned', value: 'ASN' },
  { label: 'In progress', value: 'IP' },
  { label: 'Done', value: 'DN' },
];

export const projectSetupSteps = [
  'Create Account',
  'Add Members',
  'Setup Project',
];
export const regex = {
  nameValidator: `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`,
  passwordValidator: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
};

export const storage = 'app';

// export const availableAvatrColor=

const taskList = [
  {
    title: 'Task 1',
    description: 'This is the first task description',
    assignee: { id: 'assignee1', name: 'Sachin Sharma', color: 'orange' },
    status: 'TODO',
  },
  {
    title: 'Task 1',
    description: 'This is the first task description',
    assignee: { id: 'assignee1', name: 'Sachin Sharma', color: 'orange' },
    status: 'TODO',
  },
];
