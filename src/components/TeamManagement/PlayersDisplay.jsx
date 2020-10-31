/* eslint-disable */ 
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
import { editPermission, removeFromTeam } from '../../utils/team/team'

class PlayersDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminChecked: [],
            showPlayerRemove: false,
            removeMsg: "",
            player: null,
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
    }

    async handleAdminChange(index) {
        const { players, teamId } = this.props;
        const { adminChecked } = this.state;
        const newArr = adminChecked;
        newArr[index] = !newArr[index];
        this.setState({adminChecked: newArr});
        const perm = newArr[index] ? 1 : 0;
        await editPermission(teamId, players[index].user_id, perm);
    };

    showRemoveModal(player){
        this.setState({ showPlayerRemove: true });
        this.setState({ player: player })
        this.setState({ 
            removeMsg: 
  <> 
    Are you sure you want to remove 
    <b>
      &nbsp;
      {player.name}
      &nbsp;
    </b> 
    from the team?
  </> 
        });
    }

    async handlePlayerRemove() {
        // TODO call remove endpoint
        const { player } = this.state;
        const { refresh, teamId } = this.props;
        this.setState({ showPlayerRemove: false });
        await removeFromTeam(teamId, player.user_id);
        await refresh();
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
                    title={`${player.first_name} ${player.last_name}`}
                    action={
                      player.permission_level !== 2 && 
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
export default PlayersDisplay;
