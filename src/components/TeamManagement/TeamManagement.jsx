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
import Tooltip from '@material-ui/core/Tooltip';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const members = [
  { userID: 1, name: 'Collin' },
  { userID: 2, name: 'Andy' },
  { userID: 3, name: 'Jon' },
  { userID: 4, name: 'Ray' },
  { userID: 5, name: 'Trevor' },
  { userID: 5, name: 'Trevor' },
];

const headerStyle = {
  textAlign: 'center',
  paddingBottom: '3%',
};

class TeamManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      adminChecked: [],
    };
  }

componentDidMount() {
  this.setState({adminChecked: Array(members.length).fill(false)});
}

handleAdminChange(index, event) {
  //TODO
  console.log(`toggling admin for ${members[index].name}`)
  const { adminChecked } = this.state;
  let newArr = adminChecked;
  newArr[index] = !newArr[index];
  this.setState({adminChecked: newArr});
};

handleTeamEditClick(){
  //TODO
  console.log("edit clicked")
}

handleTeamCreateClick(){
  //TODO
  console.log("create clicked")
}

renderMembers() {
  const { adminChecked } = this.state;
  return (
    adminChecked.length > 0 ? 
    <>
      <Grid container spacing={2}>
        {members.map((user, index) => {
          return (
            <Grid container className="user-card-grid" key={index} item xs={3}>
              <Card key={index} variant="outlined">
              <CardHeader
              title={user.name}
              />
              <CardContent>
                Toggle Admin? 
                <Switch
                  checked={adminChecked[index]}
                  onChange={(event) => this.handleAdminChange(index, event)}
                  color="primary"
                />
              </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
    : null
  )
}

  render() {
    return(
      <div style={{ height: "100%" }}>
            <h1 style={headerStyle}>Team Management</h1>
            <Container fluid>
              <Row>
                <Col xs={6} md={2}>
                  <h2 style={{ display:'inline-block', paddingBottom: '2%' }}>Team Control</h2>
                  <p>
                    <Button 
                      className="btn-edit-team" 
                      variant="contained" 
                      color="primary"
                      onClick={this.handleTeamEditClick}
                    >
                      Edit Team
                    </Button>
                  </p>
                  <p>
                    <Button 
                      className="btn-edit-team"
                      variant="contained" 
                      color="primary"
                      startIcon={ <AddCircleOutlineIcon/> }
                      onClick={this.handleTeamCreateClick}
                    >
                      Create Team
                    </Button>
                  </p>
                  <br></br>
                </Col>
                <Col xs={12} md={10}>
                  <div style={{ paddingLeft: '5%' }}>
                    <h2>Members</h2>
                    {this.renderMembers()}
                  </div>
                </Col>
              </Row>
            </Container>
      </div>
    )
  };
}

export default TeamManagement;
