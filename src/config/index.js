export const CONTEXT = '/taskboard';

export const taskStatus = [
  { label: 'To do', value: 'TODO' },
  { label: 'Assigned', value: 'ASN' },
  { label: 'In progress', value: 'IP' },
  { label: 'Done', value: 'DN' },
];

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
