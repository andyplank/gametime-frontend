import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ScaleLoader from 'react-spinners/ScaleLoader';
import PropTypes from 'prop-types';
import './Fundraiser.scss';
import fans from '../../assets/images/fans.jpg';
import {
  getPlayerFundraiser,
  getTeamFundraiser,
} from '../../utils/fundraising/fundraising';

const Fundraiser = () => {
  const { team_id, user_id } = useParams();
  const history = useHistory();
  const [state, setState] = useState();

  useEffect(() => {
    async function initState() {
      let response;
      if (team_id != null && user_id != null) {
        response = await getPlayerFundraiser(team_id, user_id);
      } else if (team_id != null) {
        response = await getTeamFundraiser(team_id);
      }
      const { success, error, fundraiser } = response;
      if (success && !error) {
        setState({
          isPlayer: user_id != null,
          first_name: fundraiser.first_name || '',
          last_name: fundraiser.last_name || '',
          team_name: fundraiser.team_name || '',
          donation_goal: fundraiser.donation_goal.toString() || '',
          donation_total: fundraiser.donation_total.toString() || '',
          start_timestamp: fundraiser.start_timestamp,
          end_timestamp: fundraiser.end_timestamp,
          description: fundraiser.description.toString() || '',
        });
        return;
      }
      history.push('/');
    }
    initState();
  }, []);

  return state == null ? <Loader /> : <Content {...state} />;
};

const Loader = () => {
  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="fundraiser-loader">
        <ScaleLoader color="#174ceb" />
      </div>
    </div>
  );
};

const Content = (props) => {
  const [remainingString, setRemainingString] = useState();

  const {
    isPlayer,
    first_name,
    last_name,
    team_name,
    donation_goal,
    donation_total,
    start_timestamp,
    end_timestamp,
    description,
  } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingString(getTimeRemainingString());
    }, 1000);
    return () => clearInterval(interval);
  });

  function getTimeRemainingPercent() {
    const current = Date.now() / 1000;
    const remaining = Math.round(
      ((end_timestamp - current) / (end_timestamp - start_timestamp)) * 100
    );

    if (remaining > 100) return 100;
    if (remaining < 0) return 0;
    return remaining;
  }

  function getTimeRemainingString() {
    const total = end_timestamp * 1000 - Date.now();

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    let string = '';
    // add # of days remaining
    string += `${days > 0 ? days.toString() : 0} `;
    if (days === 1) {
      string += 'Day ';
    } else {
      string += 'Days ';
    }

    // add # of hours remaining
    string += `${hours > 0 ? hours.toString() : 0} `;
    if (hours === 1) {
      string += 'Hour ';
    } else {
      string += 'Hours ';
    }
    // add # of minutes remaining
    string += `${minutes > 0 ? minutes.toString() : 0} `;
    if (minutes === 1) {
      string += 'Min ';
    } else {
      string += 'Mins ';
    }
    // add # of seconds remaining
    string += `${seconds > 0 ? seconds.toString() : 0} `;
    if (seconds === 1) {
      string += 'Sec';
    } else {
      string += 'Secs ';
    }

    return string;
  }

  let donation_percent = Math.round((donation_total / donation_goal) * 100);
  let duration_percent =
    100 -
    Math.round(
      ((Date.now() / 1000 - start_timestamp) /
        (end_timestamp - start_timestamp)) *
        100
    );

  if (donation_percent > 100) {
    donation_percent = 100;
  } else if (donation_percent < 0) {
    donation_percent = 0;
  }

  if (duration_percent > 100) {
    duration_percent = 100;
  } else if (duration_percent < 0) {
    duration_percent = 0;
  }

  return (
    <>
      <div className="fundraiser-page-wrapper d-flex flex-column align-items-center">
        <div className="fundraiser-page-content w-75">
          <div className="fundraiser-heading py-4">
            <span className="fundraiser-title-text">{team_name}</span>
          </div>
          <div className="d-flex justify-content-center py-3">
            <div className="d-flex flex-column align-items-center justify-content-center w-50">
              {isPlayer && (
                <span className="fundraiser-heading-text py-3">
                  {`${first_name} ${last_name}'s Personal Fundraiser`}
                </span>
              )}
              {!isPlayer && (
                <span className="fundraiser-heading-text py-3">
                  Team Fundraiser
                </span>
              )}
              <span className="fundraiser-body-text">{description}</span>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center w-50">
              <img src={fans} className="w-100" alt="Cheering Fans in Stands" />
            </div>
          </div>
          <div className="fundraiser-donation-bar w-100 py-3">
            <div className="progress w-100" style={{ height: '50px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Percentage of Donation Goal Achieved"
                aria-valuenow={donation_percent}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${donation_percent}%`, height: '50px' }}
              />
            </div>
            <div className="d-flex justify-content-between">
              <span className="fundraiser-caption-text">
                {`Raised: $${donation_total}`}
              </span>
              <span className="fundraiser-caption-text">
                {`Goal: $${donation_goal}`}
              </span>
            </div>
          </div>
          <div className="fundraiser-duration-bar w-100 py-3">
            <div className="progress" style={{ height: '50px' }}>
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                aria-label="Percentage of Time Remaining"
                aria-valuenow={getTimeRemainingPercent()}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${getTimeRemainingPercent()}%`,
                  height: '50px',
                }}
              />
            </div>
            <div className="d-flex justify-content-between">
              <span className="fundraiser-caption-text">
                {`Remaining: ${remainingString}`}
              </span>
              <span className="fundraiser-caption-text">
                {`Closes: ${new Date(end_timestamp * 1000).toLocaleDateString(
                  'en-US'
                )}`}
              </span>
            </div>
          </div>
          <div className="fundraiser-donate-button text-center">
            <Button variant="primary">Donate Now</Button>
          </div>
        </div>
      </div>
    </>
  );
};
Content.propTypes = {
  isPlayer: PropTypes.bool.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  team_name: PropTypes.string.isRequired,
  donation_goal: PropTypes.string.isRequired,
  donation_total: PropTypes.string.isRequired,
  start_timestamp: PropTypes.number.isRequired,
  end_timestamp: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Fundraiser;
