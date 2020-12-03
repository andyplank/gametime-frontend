import networker from '../networker/networker';
import API_URL from '../API_URL';

/**
 * Retrieves all user files for a specified team
 *
 * @param {String} team_id The uuid of the team.
 * @return {success, error, message, files}
 */
export async function getPlayerFiles(team_id) {
  const endpoint = `${API_URL}/files`;
  const config = {
    params: {
      team_id: team_id,
    },
  };

  try {
    const response = await networker.get(endpoint, config);
    const { data } = response;

    return {
      success: true,
      error: false,
      message: '',
      files: data.files,
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to retrieve user files at this time. Please try again later',
      files: null,
    };
  }
}

/**
 * Uploads a specified file for a specified team
 *
 * @param {String} team_id The uuid of the team.
 * @return {success, error, message, file}
 */
export async function createPlayerFile(team_id, name, file) {
  const endpoint = `${API_URL}/files`;

  const body = {
    team_id: team_id,
    name: name,
    file: file,
  };

  try {
    const response = await networker.post(endpoint, body);
    const { data } = response;

    return {
      success: true,
      error: false,
      message: '',
      file: {
        file_id: data.file_id,
        name: name,
        url: data.url,
      },
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to upload user files at this time. Please try again later',
      files: null,
    };
  }
}

/**
 * Deletes a specified file for a specified team
 *
 * @param {String} file_id The uuid of the file.
 * @return {success, error, message}
 */
export async function deletePlayerFile(file_id) {
  const endpoint = `${API_URL}/files`;
  const body = {
    file_id: file_id,
  };

  try {
    await networker.delete(endpoint, { data: body });

    return {
      success: true,
      error: false,
      message: '',
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to delete user files at this time. Please try again later',
      files: null,
    };
  }
}

/**
 * Retrieves all uploaded files for a specified team
 *
 * @param {String} team_id The uuid of the team.
 * @return {success, error, message, files}
 */
export async function getTeamFiles(team_id) {
  const endpoint = `${API_URL}/files/all`;
  const config = {
    params: {
      team_id: team_id,
    },
  };

  try {
    const response = await networker.get(endpoint, config);
    const { data } = response;

    return {
      success: true,
      error: false,
      message: '',
      files: data.files,
    };
  } catch (error) {
    // Assume all non-2xx status codes are unrecoverable
    return {
      success: false,
      error: true,
      message:
        'Unable to retrieve team files at this time. Please try again later',
      files: null,
    };
  }
}
