import networker from '../networker/networker';
import API_URL from '../API_URL';

/**
 * Retrieves team fundraiser data
 *
 * @param {String} team_id The uuid of the team.
 * @return {success, error, message, fundraiser}
 */
export async function getTeamFundraiser(team_id) {
  const endpoint = `${API_URL}/fundraising/id/${team_id}`;

  try {
    const response = await networker.get(endpoint);
    const { data } = response;

    const fundraiser = {
      team_name: data.team_name,
      donation_goal: data.donation_goal,
      donation_total: data.donation_total,
      start_timestamp: data.start_timestamp,
      end_timestamp: data.end_timestamp,
      description: data.description,
    };

    return {
      success: true,
      error: false,
      message: '',
      fundraiser: fundraiser,
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to retrieve fundraising details at this time. Please try again later',
      fundraiser: null,
    };
  }
}

/**
 * Retrieves player fundraiser data
 *
 * @param {String} team_id The uuid of the team.
 * @param {String} user_id The uuid of the user.
 * @return {success, error, message, fundraiser}
 */
export async function getPlayerFundraiser(team_id, user_id) {
  const endpoint = `${API_URL}/fundraising/id/${team_id}/${user_id}`;

  try {
    const response = await networker.get(endpoint);
    const { data } = response;

    const fundraiser = {
      first_name: data.first_name,
      last_name: data.last_name,
      team_name: data.team_name,
      donation_goal: data.donation_goal,
      donation_total: data.donation_total,
      start_timestamp: data.start_timestamp,
      end_timestamp: data.end_timestamp,
      description: data.description,
    };

    return {
      success: true,
      error: false,
      message: '',
      fundraiser: fundraiser,
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to retrieve fundraising details at this time. Please try again later',
      fundraiser: null,
    };
  }
}

/**
 * Creates a team fundraiser
 *
 * @param {String} team_id The uuid of the team.
 * @param {data} data the data required for the request
 * @return {success, error, message, fundraiser}
 */
export async function createTeamFundraiser(data) {
  const endpoint = `${API_URL}/fundraising/start`;

  try {
    const body = {
      teamId: data.team_id,
      goal: data.donation_goal,
      startTime: data.start_timestamp,
      endTime: data.end_timestamp,
      description: data.description,
      isTeam: 'True',
    };

    // If a 2xx status code is returned, the call succeeded
    await networker.post(endpoint, body);

    return {
      success: true,
      error: false,
      message: 'Fundraiser created successfully',
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to create fundraiser at this time. Please try again later',
    };
  }
}

/**
 * Creates a player fundraiser
 *
 * @param {String} team_id The uuid of the team.
 * @param {data} data the data required for the request
 * @return {success, error, message, fundraiser}
 */
export async function createPlayerFundraiser(data) {
  const endpoint = `${API_URL}/fundraising/start`;

  try {
    const body = {
      teamId: data.team_id,
      goal: data.donation_goal,
      startTime: data.start_timestamp,
      endTime: data.end_timestamp,
      description: data.description,
      isTeam: 'False',
    };

    // If a 2xx status code is returned, the call succeeded
    await networker.post(endpoint, body);

    return {
      success: true,
      error: false,
      message: 'Fundraiser created successfully',
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to create fundraiser at this time. Please try again later',
    };
  }
}

/**
 * Edits an existing team fundraiser
 *
 * @param {data} data the data required for the request
 * @return {success, error, message, fundraiser}
 */
export async function editTeamFundraiser(data) {
  const endpoint = `${API_URL}/fundraising/edit`;

  try {
    const body = {
      teamId: data.team_id,
      goal: data.donation_goal,
      endTime: data.end_timestamp,
      description: data.description,
      current: 0,
      isTeam: 'True',
    };

    // If a 2xx status code is returned, the call succeeded
    await networker.post(endpoint, body);

    return {
      success: true,
      error: false,
      message: 'Successfully updated fundraiser',
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to update fundraiser at this time. Please try again later',
    };
  }
}

/**
 * Edits an existing player fundraiser
 *
 * @param {data} data the data required for the request
 * @return {success, error, message, fundraiser}
 */
export async function editPlayerFundraiser(data) {
  const endpoint = `${API_URL}/fundraising/edit`;

  try {
    const body = {
      teamId: data.team_id,
      goal: data.donation_goal,
      endTime: data.end_timestamp,
      description: data.description,
      current: 0,
      isTeam: 'False',
    };

    // If a 2xx status code is returned, the call succeeded
    await networker.post(endpoint, body);

    return {
      success: true,
      error: false,
      message: 'Successfully updated fundraiser',
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message: 'Unable to edit fundraiser at this time. Please try again later',
    };
  }
}
