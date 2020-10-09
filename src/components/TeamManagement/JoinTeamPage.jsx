import React, {useEffect} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import {joinTeam} from '../../utils/team/team'

const JoinTeamPage = () => {
    useEffect(() => {
        const join = async () => {
            await joinTeam(1,14);
        }
        join();
      });

    return <Redirect to="/Landing" />
};


export default withRouter(JoinTeamPage);