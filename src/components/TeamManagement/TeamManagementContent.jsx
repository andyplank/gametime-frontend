/* eslint-disable */ 
import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import {
    Container,
    Row,
    Col,
  } from 'react-bootstrap';

import PlayersDisplay from './PlayersDisplay';
import { getPlayers, getTeamData, createTeam, editTeam, getTeamsForUser } from '../../utils/team/team';

const headerStyle = {
textAlign: 'center',
paddingBottom: '3%',
};

class TeamManagementContent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        players: [],
        showTeamEdit: false,
        showTeamCreate: false,
        showTeamInvite: false,
        teamNameError: false,
        teamName: '',
        inviteLink: `${window.location.hostname}:8080/#/joinTeam`
      };
    }
  
    async componentDidMount() {
      const { team } = this.props;
      this.fetchPlayers();
      await getTeamsForUser(1);
      this.setState({ teamName: team.name ? team.name : "" })
      
      await getTeamData(team.id);
    } 
    
    async fetchPlayers() {
      const {team} = this.props;
      const players = await getPlayers(1);
      this.setState({ players: players });
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
      console.log("edit clicked")
    }
  
    handleTeamCreateClick(){
      this.setState({ showTeamCreate: true })
      console.log("create clicked")
    }
  
    handleTeamInviteClick() {
      this.setState({ showTeamInvite: true });
    }
  
    handleEditClose() {
      // TODO clear any edits
      this.setState({ showTeamEdit: false });
    }
  
    handleCreateClose() {
      this.setState({ showTeamCreate: false});
      this.setState({ teamNameError: false })
      this.setState({ teamName: "" });
    }
  
    async handleSaveTeamEdits() {
      const { teamName } = this.state;
      if(this.validateFields()){
        console.log("saving team", teamName)
        await editTeam(1, teamName);
        this.setState({ showTeamEdit: false });
      }
    }
    
    async handleSaveTeamCreate() {
      const { teamName } = this.state;
      const { user } = this.props;
      if(this.validateFields()){
         await createTeam(1, teamName);
         this.setState({ teamName: "" });
         this.setState({ showTeamCreate: false });
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
                  onChange={(event) => this.setState({teamName: event.target.value})}
                  defaultValue={teamName}
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
  
    // move this to profile page when it's up
    renderTeamCreateModal() {
      const { showTeamCreate, teamNameError } = this.state;
      return (
        <Modal
          show={showTeamCreate}
          onHide={() => this.handleCreateClose()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div style={{ paddingBottom: '5%' }}>
                <TextField
                  variant="outlined"
                  label="Team Name"
                  error={teamNameError}
                  onChange={(event) =>
                    this.setState({ teamName: event.target.value })
                  }
                  helperText={teamNameError ? '0 < Team Name < 30' : null}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleCreateClose()}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleSaveTeamCreate()}
            >
              Create
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
            <a href={inviteLink}>
              {inviteLink}
            </a>
          </Modal.Body>
        </Modal>
      );
    }
  
    render() {
      const { players, teamName } = this.state;
      return(
          <div style={{ height: "100%" }}>
            {this.renderTeamEditModal()}
            {this.renderTeamCreateModal()}
            {this.renderInviteLinkModal()}
            <h1 style={headerStyle}> 
              TeamManagement 
            </h1>
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
                  <p>
                    <Button
                      className="btn-team"
                      variant="contained"
                      color="primary"
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={() => this.handleTeamCreateClick()}
                    >
                      Create Team
                    </Button>
                  </p>
                  <br />
                </Col>
                <Col xs={12} md={10}>
                  <div style={{ paddingLeft: '5%' }}>
                    <h2>Players</h2>
                    { players.length > 0 
                        ? (
                            <PlayersDisplay players={players} refresh={() => this.fetchPlayers()} />
                          ) 
                        : null
                    }
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
      )
    };
  }
  
  export default TeamManagementContent;
  