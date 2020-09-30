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
    this.handleChange = this.handleChange.bind(this)
  }

componentDidMount() {
  this.setState({adminChecked: Array(members.length).fill(false)});
}

handleChange(index, event) {
  const { adminChecked } = this.state;
  let newArr = adminChecked;
  newArr[index] = !newArr[index]
  this.setState({adminChecked: newArr})
};

renderMembers() {
  const { adminChecked } = this.state;
  return (
    adminChecked.length > 0 ? 
    <>
      <Grid container spacing={5}>
        {members.map((user, index) => {
          return (
            <Grid className="user-card-grid" key={index} item xs={2}>
              <Card key={index} variant="outlined">
              <CardHeader
              title={user.name}
              />
              <CardContent>
                Toggle Admin? 
                <Switch
                  checked={adminChecked[index]}
                  onChange={(event) => this.handleChange(index, event)}
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
      <>
        <div>
        <h1 style={headerStyle}>Team Management</h1>
          <Container fluid>
            <Row>
              <Col xs={6} md={2}>
                <h2>Team Controls</h2>
                <ul>
                <li>Create Team</li>
                <li>Edit Team</li>
                </ul>
              </Col>
              <Col xs={12} md={10}>
                <h2>Members</h2>
                {this.renderMembers()}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  };
}

export default TeamManagement;
