import React from 'react';
import './TeamManagement.scss';
import './TeamManagement.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import PropTypes, { object } from 'prop-types';

class PlayersDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminChecked: [],
            showPlayerRemove: false,
            // TODO: use this in api call playerToRemove: null,
            removeMsg: "",
        };
    }

    componentDidMount() {
        const { players } = this.props;
        const arr = players.map((item) => {
            if(item.permission_level > 0) {
                return true;
            }
            return false;
        });
        this.setState({ adminChecked: arr });
        console.log(players);
    }

    handleAdminChange(index) {
        // TODO
        const { players } = this.props;
        console.log(`toggling admin for ${players[index].name}`)
        const { adminChecked } = this.state;
        const newArr = adminChecked;
        newArr[index] = !newArr[index];
        this.setState({adminChecked: newArr});
    };

    showRemoveModal(player){
        this.setState({ showPlayerRemove: true });
        this.setState({ 
            removeMsg: 
  <> 
    Are you sure you want to remove 
    <b>
      {player.name}
    </b> 
    from the team?
  </> 
        });
        // this.setState({ playerToRemove: player})
    }

    handlePlayerRemove() {
        // TODO call remove endpoint
        this.setState({ showPlayerRemove: false })
    }

    render(){
        const { adminChecked, showPlayerRemove, removeMsg } = this.state;
        const { players } = this.props;
        return (
            adminChecked.length > 0 ? 
        (
          <>
            <Modal
              show={showPlayerRemove}
              onHide={() => this.setState({ showPlayerRemove: false })}
            >
              <Modal.Header closeButton>
                <Modal.Title>Remove Player</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {removeMsg}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="contained" color="secondary" onClick={() => this.setState({showPlayerRemove: false})}>No</Button>
                <Button variant="contained" color="primary" onClick={() => this.handlePlayerRemove()}>Yes</Button>
              </Modal.Footer>
            </Modal>
            <Grid container spacing={2}>
              {players.map((player, index) => {
                  const i = index;
            return (
              <Grid container key={i} item xs={3}>
                <Card 
                  className="player-card"
                  key={i} 
                  variant="outlined"
                >
                  <CardHeader
                    title={player.name}
                    action={
                      (
                        <IconButton 
                          style={{ outline: "none" }}
                          onClick={() => this.showRemoveModal(player)}
                        >
                          <CloseIcon />
                        </IconButton>
                      )
                    }
                  />
                  { player.permission_level !== 2
                  ? (
                    <CardContent>
                      Toggle Admin? 
                      <Switch 
                        className="adminSwitch"
                        checked={adminChecked[index]}
                        onChange={() => this.handleAdminChange(index)}
                        color="primary"
                      />
                    </CardContent>
                  )
                  : ( 
                    <CardContent>
                      Team Owner
                    </CardContent>
                  )
                }
                </Card>
              </Grid>
                    );
                    })}
            </Grid>
          </>
        )
        : null
        )
    }    
}

PlayersDisplay.propTypes = {
    players: PropTypes.arrayOf(object).isRequired
  };
export default PlayersDisplay;