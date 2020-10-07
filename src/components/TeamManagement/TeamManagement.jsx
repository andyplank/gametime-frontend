/* eslint-disable */
import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import MembersDisplay from './MembersDisplay';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const members = [
  { userID: 1, firstName: 'daniel', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
  { userID: 1, firstName: 'Collin', lastName: 'Li' },
];

const headerStyle = {
  textAlign: 'center',
  paddingBottom: '3%',
};

class TeamManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTeamEdit: false,
      showTeamCreate: false,
      showTeamInvite: false,
      teamNameError: false,
      fundGoalError: false,
      fundDescError: false,
      routingNumberError: false,
      adminChecked: [],
    };
  }

handleTeamEditClick(){
  //TODO
  this.setState({ showTeamEdit: true })
  console.log("edit clicked")
}

handleTeamCreateClick(){
  //TOD
  this.setState({ showTeamCreate: true })
  console.log("create clicked")
}

  handleTeamInviteClick() {
    //TODO generate link with endpoint
    this.setState({ showTeamInvite: true });
  }

  handleEditClose() {
    //TODO clear any edits
    this.setState({ showTeamEdit: false })
  }

  handleSaveTeamEdits() {
    //TODO call endpoint(PUT) to save edits to team
    console.log("save team edits clicked")
  }

  handleSaveTeamCreate() {
    //TODO call endpoint(POST) to create team
    console.log("save team create clicked")
  }

  renderTeamEditModal() {
    const { 
      showTeamEdit,
      teamNameError,
      fundGoalError,
      fundDescError,
      routingNumberError,
    } = this.state;
    return (
      <Modal
        show={showTeamEdit}
        onHide={() => this.handleEditClose()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ paddingBottom: "5%" }}>
              <TextField variant="outlined" label="Team Name" error={teamNameError} />
            </div>
            <div style={{ paddingBottom: "5%" }}>
              <TextField variant="outlined" label="Fund Goal" error={fundGoalError} />
            </div>
            <div style={{ paddingBottom: "5%" }}>
              <TextField variant="outlined" label="Fund Description" error={fundDescError} />
            </div>
            <div>
              <TextField variant="outlined" label="Routing Number" error={routingNumberError}/>
            </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="secondary" onClick={() => this.handleEditClose()}>Close</Button>
          <Button variant="contained" color="primary" onClick={() => this.handleSaveTeamEdits()}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  renderTeamCreateModal() {
    const { 
      showTeamCreate,
      teamNameError,
      fundGoalError,
      fundDescError,
      routingNumberError,
    } = this.state;
    return (
      <Modal
        show={showTeamCreate}
        onHide={() => this.setState({ showTeamCreate: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ paddingBottom: "5%" }}>
              <TextField variant="outlined" label="Team Name" error={teamNameError} />
            </div>
            <div style={{ paddingBottom: "5%" }}>
              <TextField variant="outlined" label="Fund Goal" error={fundGoalError} />
            </div>
            <div style={{ paddingBottom: "5%" }}>
              <TextField variant="outlined" label="Fund Description" error={fundDescError} />
            </div>
            <div>
              <TextField variant="outlined" label="Routing Number" error={routingNumberError}/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="secondary" onClick={() => this.setState({ showTeamCreate: false })}>Close</Button>
          <Button variant="contained" color="primary" onClick={() => this.handleSaveTeamCreate()}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    )
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
    )
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
              <h2 style={{ display:'inline-block', paddingBottom: '2%' }}>Team Control</h2>
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
                  startIcon={ <AddCircleOutlineIcon/> }
                  onClick={() => this.handleTeamCreateClick()}
                >
                  Create Team
                </Button>
              </p>
              <br></br>
            </Col>
            <Col xs={12} md={10}>
              <div style={{ paddingLeft: '5%' }}>
                <h2>Members</h2>
                <MembersDisplay members={members}/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  };
}

export default TeamManagement;
