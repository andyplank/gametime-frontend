import _ from 'lodash';

const default_user = {
  id: '',
  first_name: '',
  last_name: '',
  email_address: '',
  default_phone_number: '',
  optional_phone_numbers: [],
};

const default_teams = [];

const default_status = {
  signed_in: false,
  selected_team: 0,
};

// eslint-disable-next-line no-unused-vars
const default_state = {
  user: default_user,
  teams: default_teams,
  status: default_status,
};

// eslint-disable-next-line no-unused-vars
const testing_state = {
  user: {
    id: 'asdf-1234-ghji5678',
    first_name: 'Mike',
    last_name: 'Plue',
    email_address: 'Mike.Plue@GameTime.com',
    default_phone_number: '+11234567890',
    optional_phone_numbers: [
      '+10987654321',
      '+15551234',
      '+15554321',
      '+132176540987',
    ],
  },
  teams: [
    {
      id: 'asdf-1234-ghji5678',
      name: 'San Marcos Lacrosse',
      role: 'Owner',
    },
    {
      id: 'ghjk-5678-asdf1234',
      name: 'San Diego Tennis',
      role: 'Administrator',
    },
    {
      id: 'zxcv-9876-vbnm5432',
      name: 'La Hacienda Baseball',
      role: 'Member',
    },
  ],
  status: {
    signed_in: true,
    selected_team: 0,
  },
};

 function reducer(state = default_state, action) {
  // function reducer(state = testing_state, action) {
  const copy = _.cloneDeep(state);
  switch (action.type) {
    // Actions pertaining to USER
    case 'SET_USER':
      copy.user = action.payload;
      return copy;
    case 'ADD_PHONE_NUMBER':
      copy.user.optional_phone_numbers.push(action.payload);
      return copy;
    case 'REMOVE_PHONE_NUMBER': {
      const index = copy.user.optional_phone_numbers.indexOf(action.payload);
      copy.user.optional_phone_numbers.splice(index, 1);
      return copy;
    }

    case 'REMOVE_TEAM': {
      const index = copy.teams.indexof(action.payload);
      copy.teams.splice(index, 1);
      return copy;
    }
    // Actions pertaining to TEAMS
    case 'SET_TEAMS':
      copy.teams = action.payload;
      return copy;
    // Actions pertaining to STATE
    case 'SET_SIGNED_IN':
      copy.status.signed_in = action.payload;
      return copy;
    case 'SET_SELECTED_TEAM':
      copy.status.selected_team = action.payload;
      return copy;
    default:
      return state;
  }
}

export default reducer;
