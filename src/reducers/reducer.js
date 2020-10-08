const testingState = {
  user: {
    id: 'asdf-1234-ghji5678',
    firstName: 'Mike',
    lastName: 'Plue',
    email: 'Mike.Plue@GameTime.com',
    teams: [
      {
        id: 'asdf-1234-ghji5678',
        name: 'San Marcos Lacrosse',
        roles: ['administrator', 'coach']
      },
      {
        id: 'asdf-1234-ghji5678',
        name: 'San Marcos Tennis',
        roles: ['spectator']
      }
    ]
  },
  status: {
    signedIn: true,
    selectedTeam: 0
  }
};

// const defaultState = {
//   user: {},
//   status: {
//     signedIn: false
//   }
// };

// function reducer(state = defaultState, action) {
function reducer(state = testingState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
