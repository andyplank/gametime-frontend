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

class PlayersDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminChecked: [],
            showPlayerRemove: false,
            playerToRemove: null,
            removeMsg: "",
        };
    }

    componentDidMount() {
        const { players } = this.props;
        this.setState({adminChecked: Array(players.length).fill(false)});
    }

    handleAdminChange(index) {
        //TODO
        const { players } = this.props;
        console.log(`toggling admin for ${players[index].firstName}`)
        const { adminChecked } = this.state;
        let newArr = adminChecked;
        newArr[index] = !newArr[index];
        this.setState({adminChecked: newArr});
    };

    showRemoveModal(player){
        this.setState({ showPlayerRemove: true });
        this.setState({ removeMsg: <>Are you sure you want to remove <b>{player.firstName} {player.lastName}</b> from the team?</>})
        this.setState({ playerToRemove: player})
    }

    handlePlayerRemove() {
        //TODO call remove endpoint
        console.log("removing " + this.state.playerToRemove.firstName);
        this.setState({ showPlayerRemove: false })
    }

    render(){
        const { adminChecked, showPlayerRemove, removeMsg } = this.state;
        const { players } = this.props;
        return (
            adminChecked.length > 0 ? 
            <>
                <Modal
                    show={showPlayerRemove}
                    onHide={() => this.setState({ showPlayerRemove: false })}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Remove Player</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form>
                        {removeMsg}
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="secondary" onClick={() => this.setState({showPlayerRemove: false})}>No</Button>
                        <Button variant="contained" color="primary" onClick={() => this.handlePlayerRemove()}>Yes</Button>
                    </Modal.Footer>
                </Modal>
                <Grid container spacing={2}>
                    {players.map((player, index) => {
                    return (
                        <Grid container className="player-card-grid" key={index} item xs={3}>
                        <Card 
                            className="player-card"
                            key={index} 
                            variant="outlined"
                        >
                            <CardHeader
                            title={`${player.firstName} ${player.lastName}`}
                            action={
                                <IconButton 
                                    style={{ outline: "none" }}
                                    onClick={() => this.showRemoveModal(player)}
                                    >
                                    <CloseIcon/>
                                </IconButton>
                            }
                            />
                            <CardContent>
                                Toggle Admin? 
                                <Switch 
                                    className="adminSwitch"
                                    checked={adminChecked[index]}
                                    onChange={() => this.handleAdminChange(index)}
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
}
export default PlayersDisplay;