import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Header from '../Header/Header';
import PlayersDisplay from './PlayersDisplay';
import { getPlayers, getTeamData, getTeamsForUser } from '../../utils/team/team';


const players = [
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
  { id: 1, firstName: 'Daniel', lastName: 'Plue' },
];

const headerStyle = {
  textAlign: 'center',
  paddingBottom: '3%',
};

const TeamManagement = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTeamEdit: false,
      showTeamCreate: false,
      showTeamInvite: false,
      teamNameError: false,
      fundGoalError: false,
      fundDescError: false,
      accountNumberError: false,
      routingNumberError: false,
      teamName: '',
    };
  }

  componentDidMount(){
    getPlayers(1);
    getTeamData(1);
    getTeamsForUser(1);
  }


  validateFields(team) {
    let canSave = true;

    if(team.name.length > 60 || team.name.length === 0){
      canSave = false;
      this.setState({ teamNameError: true });
    }
    else{
      this.setState({ teamNameError: false })
    }

    return canSave;
  }

  handleTeamEditClick(){
    // TODO
    this.setState({ showTeamEdit: true })
    console.log("edit clicked")
  }

  handleTeamCreateClick(){
    // TODO
    this.setState({ showTeamCreate: true })
    console.log("create clicked")
  }

  handleTeamInviteClick() {
    // TODO generate link with endpoint
    this.setState({ showTeamInvite: true });
  }

  handleEditClose() {
    // TODO clear any edits
    this.setState({ showTeamEdit: false });
  }

  handleCreateClose() {
    this.setState({ showTeamCreate: false});
    this.setState({ teamName: "" });
  }

  /* use when endpoints in
  handleSaveTeamEdits() {
    // TODO call endpoint to save edits to team
    console.log('save team edits clicked');
  }

  handleSaveTeamCreate() {
    //TODO call endpoint(POST) to create team
    console.log('saving team: ' + this.state.teamName);
    this.setState({ teamName: "" });
  }
  */

  renderTeamEditModal() {
    const {
      showTeamEdit,
      teamNameError,
      fundGoalError,
      fundDescError,
      accountNumberError,
      routingNumberError,
    } = this.state;
    return (
      <Modal
        class="edit-modal"
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
              />
            </div>
            <div style={{ paddingBottom: '5%' }}>
              <TextField
                variant="outlined"
                label="Fund Goal"
                error={fundGoalError}
              />
            </div>
            <div style={{ paddingBottom: '5%' }}>
              <TextField
                variant="outlined"
                label="Fund Description"
                error={fundDescError}
              />
            </div>
            <div style={{ paddingBottom: '5%' }}>
              <TextField
                variant="outlined"
                label="Account Number"
                error={accountNumberError}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                label="Routing Number"
                error={routingNumberError}
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
    const { showTeamCreate, teamNameError, teamName } = this.state;
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
                value={teamName}
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
    const { showTeamInvite } = this.state;
    return (
      <Modal
        show={showTeamInvite}
        onHide={() => this.setState({ showTeamInvite: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title> Invite Link </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ textAlign: 'center' }}>invite link here</p>
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    return(
      <div style={{ height: "100%" }}>
        {this.renderTeamEditModal()}
        {this.renderTeamCreateModal()}
        {this.renderInviteLinkModal()}
        <h1 style={headerStyle}>Team Management</h1>
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
                <PlayersDisplay players={players} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  };
}

export default TeamManagement;
