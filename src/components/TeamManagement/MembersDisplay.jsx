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

class MembersDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminChecked: [],
        };
    }

    componentDidMount() {
        const { members } = this.props;
        this.setState({adminChecked: Array(members.length).fill(false)});
    }

    handleAdminChange(index) {
        //TODO
        const { members } = this.props;
        console.log(`toggling admin for ${members[index].name}`)
        const { adminChecked } = this.state;
        let newArr = adminChecked;
        newArr[index] = !newArr[index];
        this.setState({adminChecked: newArr});
    };

    handleMemberRemove(user){
        //TODO
        console.log(`removing ${user.firstName} ${user.lastName}`)
      }

    render(){
        const { adminChecked } = this.state;
        const { members } = this.props;
        return (
            adminChecked.length > 0 ? 
            <>
                <Grid container spacing={2}>
                    {members.map((user, index) => {
                    return (
                        <Grid container className="user-card-grid" key={index} item xs={3}>
                        <Card 
                            className="member-card"
                            key={index} 
                            variant="outlined"
                        >
                            <CardHeader
                            title={`${user.firstName} ${user.lastName}`}
                            action={
                                <IconButton 
                                    style={{ outline: "none" }}
                                    onClick={() => this.handleMemberRemove(user)}
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
export default MembersDisplay;