import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import {
    Container,
    Row,
    Col,
    Jumbotron
  } from 'react-bootstrap';

import PlayersDisplay from './PlayersDisplay';
import { getTeamData, editTeam } from '../../utils/team/team';

class TeamManagementContent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        players: [],
        showTeamEdit: false,
        showTeamInvite: false,
        teamNameError: false,
        teamName: '',
        inviteLink: `${window.location.hostname}:8080/#/join/${props.team_id}`
      };
    }

    async componentDidMount() {
      this.fetchPlayers();
    } 
    
    // call getTeamData again to refresh the players list
    async fetchPlayers() {
      const { team_id, playerId } = this.props;
      const data = await getTeamData(team_id, playerId)
      this.setState({ players: data.users });
    }
  
    validateFields() {
      const { teamName } = this.state;
      let canSave = true;
      if(teamName.length > 30 || teamName.length === 0){
        canSave = false;
        this.setState({ teamNameError: true });
      }
      else{
        this.setState({ teamNameError: false })
      }
  
      return canSave;
    }
  
    handleTeamEditClick(){
      this.setState({ showTeamEdit: true })
    }
  
  
    handleTeamInviteClick() {
      this.setState({ showTeamInvite: true });
    }
  
    handleEditClose() {
      // TODO clear any edits
      this.setState({ showTeamEdit: false });
    }
  
    async handleSaveTeamEdits() {
      const { teamName } = this.state;
      const { team_id, dispatchTeamEdit } = this.props;
      if(this.validateFields()){
        await editTeam(team_id, teamName);
        this.setState({ showTeamEdit: false });
        dispatchTeamEdit(teamName);
      }
    }
    
    renderTeamEditModal() {
      const {
        showTeamEdit,
        teamNameError,
        teamName
      } = this.state;
      return (
        <Modal
          className="edit-modal"
          show={showTeamEdit}
          onHide={() => this.handleEditClose()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div style={{ paddingBottom: '5%' }}>
                <TextField
                  variant="outlined"
                  label="Team Name"
                  error={teamNameError}
                  onChange={(event) => this.setState({teamName: event.target.value ? event.target.value : ""})}
                  defaultValue={teamName}
                  helperText={teamNameError ? '0 < Team Name < 30' : null}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleEditClose()}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleSaveTeamEdits()}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  
    renderInviteLinkModal() {
      const { showTeamInvite, inviteLink } = this.state;
      return (
        <Modal
          show={showTeamInvite}
          onHide={() => this.setState({ showTeamInvite: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title> Invite Link </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <a target="_blank" rel="noopener noreferrer" href={inviteLink}>
              {inviteLink}
            </a>
          </Modal.Body>
        </Modal>
      );
    }
  
    render() {
      const { players } = this.state;
      const { team_id } = this.props;
      return(
        <div style={{ height: "100%" }}>
          {this.renderTeamEditModal()}
          {this.renderInviteLinkModal()}
          <Jumbotron>
            <h2 className="text-center"> 
              TeamManagement 
            </h2>
          </Jumbotron>
          <Container fluid>
            <Row>
              <Col xs={6} md={2}>
                <h2 style={{ display: 'inline-block', paddingBottom: '2%' }}>
                  Team Control
                </h2>
                <p>
                  <Button
                    className="btn-team"
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleTeamEditClick()}
                  >
                    Edit Team
                  </Button>
                </p>
                <p>
                  <Button
                    className="btn-team"
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleTeamInviteClick()}
                  >
                    Show Invite Link
                  </Button>
                </p>
                <br />
              </Col>
              <Col xs={12} md={10}>
                <div style={{ paddingLeft: '5%' }}>
                  <h2>Players</h2>
                  { players.length > 0 &&
                    <PlayersDisplay players={players} refresh={() => this.fetchPlayers()} team_id={team_id} />
                  }
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )
    };
  }

  TeamManagementContent.propTypes = {
    team_id: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    dispatchTeamEdit: PropTypes.func.isRequired
  }
  
  export default TeamManagementContent;
  