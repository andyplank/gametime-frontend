import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  getPlayerFundraiser,
  getTeamFundraiser,
  createPlayerFundraiser,
  createTeamFundraiser,
  editPlayerFundraiser,
  editTeamFundraiser,
} from '../../utils/fundraising/fundraising';
import './Fundraising.scss';
import Email from '../Email/Email';


const defaultState = {
  statusMessage: '',
  isActive: false,
  donation_goal: {
    value: '',
    error: '',
    isValid: true,
  },
  end_date: {
    value: '',
    error: '',
    isValid: true,
  },
  description: {
    value: '',
    error: '',
    isValid: true,
  },
}

const Fundraising = () => {
  // Extract team data from the redux store
  const { user, team } = useSelector((store) => {
    return {
      user: store.user,
      team: store.user.teams[store.status.selected_team],
    };
  });

  // Determine if a fundraiser already exists, and if so, extract data
  useEffect(() => {
    async function initState() {
      setState(defaultState);
      // If team owner, get team fundraising data
      let response;
      if (team.permission_level === 2) {
        response = await getTeamFundraiser(team.team_id);
      } else {
        response = await getPlayerFundraiser(team.team_id, user.id);
      }
      const { success, error, fundraiser } = response;
      if (success && !error) {
        setState({
          ...state,
          isActive: true,
          donation_goal: {
            value: fundraiser.donation_goal.toString() || '',
            error: '',
            isValid: true,
          },
          end_date: {
            value: new Date(fundraiser.end_timestamp * 1000).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }
            ),
            error: '',
            isValid: true,
          },
          description: {
            value: fundraiser.description.toString() || '',
            error: '',
            isValid: true,
          },
        });
      }
    }
    initState();
  }, [team.team_id]);

  const [state, setState] = useState(defaultState);

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleCreateFundraiser(event) {
    event.preventDefault();
    if (!validate()) return;

    const data = {
      team_id: team.team_id,
      donation_goal: state.donation_goal.value.replace(/,/g, ''),
      start_timestamp: Date.now() / 1000,
      end_timestamp: new Date(state.end_date.value).getTime() / 1000,
      description: state.description.value,
    };

    let response;
    if (team.permission_level === 2) {
      response = await createTeamFundraiser(data);
    } else {
      response = await createPlayerFundraiser(data);
    }
    const { success, error } = response;
    if (success && !error) {
      setState({
        ...state,
        statusMessage: 'Fundraiser successfully created',
        isActive: true,
      });
    } else {
      setState({
        ...state,
        statusMessage: 'Failed to create fundraiser. Please try again later',
      });
    }
  }

  async function handleEditFundraiser(event) {
    event.preventDefault();
    if (!validate()) return;

    const data = {
      team_id: team.team_id,
      donation_goal: state.donation_goal.value.replace(/,/g, ''),
      end_timestamp: new Date(state.end_date.value).getTime() / 1000,
      description: state.description.value,
    };

    let response;
    if (team.permission_level === 2) {
      response = await editTeamFundraiser(data);
    } else {
      response = await editPlayerFundraiser(data);
    }

    const { success, error } = response;

    if (success && !error) {
      setState({
        ...state,
        statusMessage: 'Fundraiser updated successfully',
        isActive: true,
      });
    } else {
      setState({
        ...state,
        statusMessage: 'Failed to update fundraiser. Please try again later',
      });
    }
  }

  function handleDeleteFundraiser(event) {
    event.preventDefault();
  }

  function validate() {
    // Clone pre-existing state to prevent inputted data loss
    const newState = _.cloneDeep(state);

    // Validate donation goal
    const donation_goal = state.donation_goal.value.replace(/,/g, '');
    const currency_regex = /^[0-9]*$/;
    if (donation_goal === '') {
      newState.donation_goal.error = 'Donation goal is a required field';
    } else if (!currency_regex.test(donation_goal)) {
      newState.donation_goal.error =
        'Donation goal may only contain numbers and commas';
    } else if (donation_goal > 100000) {
      newState.donation_goal.error =
        'Donation goal may be a maximum of $100,000';
    }

    if (newState.donation_goal.error !== '') {
      newState.donation_goal.isValid = false;
    }

    // Validate end date
    const end_date = state.end_date.value;
    const date_regex = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
    if (end_date === '') {
      newState.end_date.error = 'End date is a required field';
    } else if (!date_regex.test(end_date)) {
      newState.end_date.error = 'End date must be of the form mm/dd/yyyy';
    } else {
      const end_date_epoch = new Date(end_date).getTime();
      const current_time_epoch = Date.now();
      if (end_date_epoch < current_time_epoch + 86400 * 1000 * 6) {
        newState.end_date.error =
          'End date must be at least 7 days in the future';
      } else if (end_date_epoch > current_time_epoch + 86400 * 1000 * 366) {
        newState.end_date.error =
          'End date must be no more than one year in the future';
      }
    }

    if (newState.end_date.error !== '') {
      newState.end_date.isValid = false;
    }

    // Validate description
    const description = state.description.value;
    if (description === '') {
      newState.description.error = 'Description is a required field';
    } else if (description.length > 600) {
      newState.description.error = 'Description must be 600 characters or less';
    }

    if (newState.description.error !== '') {
      newState.description.isValid = false;
    }

    // Update state
    if (
      !newState.donation_goal.isValid ||
      !newState.end_date.isValid ||
      !newState.description.isValid
    ) {
      setState(newState);
      return false;
    }

    return true;
  }

  return (
    <div className="fill-vert fundraising-page-wrapper d-flex flex-column align-items-center">
      <div className="fundraising-page-content w-75">
        <div className="fundraising-title py-4">
          <span className="fundraising-title-text">Manage Fundraiser</span>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="DonationGoal">Donation Goal</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="DonationGoal$">
                    $
                  </span>
                </div>
                <input
                  className={`form-control form-control-lg ${
                    state.donation_goal.isValid ? '' : 'is-invalid'
                  }`}
                  type="text"
                  id="DonationGoal"
                  value={state.donation_goal.value}
                  onChange={(e) =>
                    setState({
                      ...state,
                      donation_goal: {
                        value: e.target.value,
                        error: '',
                        isValid: true,
                      },
                    })
                  }
                />
              </div>
              {!state.donation_goal.isValid && (
                <small className="form-text d-block invalid-feedback">
                  {state.donation_goal.error}
                </small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="FundraiserEndDate">Fundraiser End Date</label>
              <input
                className={`form-control form-control-lg ${
                  state.end_date.isValid ? '' : 'is-invalid'
                }`}
                type="text"
                id="FundraiserEndDate"
                value={state.end_date.value}
                onChange={(e) =>
                  setState({
                    ...state,
                    end_date: {
                      value: e.target.value,
                      error: '',
                      isValid: true,
                    },
                  })
                }
              />
              {!state.end_date.isValid && (
                <small className="form-text d-block invalid-feedback">
                  {state.end_date.error}
                </small>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="FundraiserDescription">Description</label>
            <textarea
              className={`form-control form-control-lg ${
                state.description.isValid ? '' : 'is-invalid'
              }`}
              id="FundraiserDescription"
              value={state.description.value}
              onChange={(e) => {
                if (e.target.value.length <= 600) {
                  setState({
                    ...state,
                    description: {
                      value: e.target.value,
                      error: '',
                      isValid: true,
                    },
                  });
                }
              }}
            />
            {state.description.isValid &&
              state.description.value.length === 0 && (
                <small className="form-text text-muted">Max: 600</small>
              )}
            {state.description.isValid &&
              state.description.value.length > 0 &&
              state.description.value.length <= 600 && (
                <small className="form-text text-muted">
                  {`Remaining: ${(
                    600 - state.description.value.length
                  ).toString()}`}
                </small>
              )}
            {!state.description.isValid && (
              <small className="form-text invalid-feedback">
                {state.description.error}
              </small>
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!state.isActive && (
              <button
                className="btn btn-primary my-2"
                type="submit"
                onClick={handleCreateFundraiser}
              >
                Start Fundraiser
              </button>
            )}
            {state.isActive && (
              <>
                <button
                  className="btn btn-danger my-2 mr-1"
                  type="submit"
                  onClick={handleDeleteFundraiser}
                >
                  Cancel Fundraiser
                </button>
                <button
                  className="btn btn-primary my-2 ml-1"
                  type="submit"
                  onClick={handleEditFundraiser}
                >
                  Update Fundraiser
                </button>
                <button
                  className="btn btn-primary my-2 ml-1"
                  type="submit"
                  onClick={() => window.open(`https://gametime-server.hubermjonathan.com:8080/fundraising/report?team_id=${team.team_id}`, "_blank")}
                >
                  Download Report
                </button>
              </>
            )}
          </div>
        </form>
        <div>
          {state.isActive && team.permission_level !== 2 && <Email />}
        </div>
      </div>
      {state.statusMessage !== '' && (
        <div className="d-flex justify-content-center">
          <span className="form-text">{state.statusMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Fundraising;
