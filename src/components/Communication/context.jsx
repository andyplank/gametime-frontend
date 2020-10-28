import { createContext } from 'react';

const CommContext = createContext({
  members: [],
  setMembers: () => {},
  groups: [],
  setGroups: () => {},
  selected: {},
  setSelected: () => {},
  refresh: () => {}
});

export default CommContext;
