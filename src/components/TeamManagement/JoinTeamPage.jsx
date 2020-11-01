import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {joinTeam} from "../../utils/team/team";


const JoinTeamPage = () => {

    function selector(store) {
      return {
        id: store.user.id ? store.user.id : 14,
        signed_in: store.status.signed_in,
        teams: store.teams,
        selected: store.status.selected_team,
      };
    }
    
    const state = useSelector(selector);

    useEffect(() => {
        const join = async () => {
          let teamId = "";
          teamId += window.location.href;
          teamId = teamId.substr(teamId.lastIndexOf("/")+1);
          console.log(teamId);
          await joinTeam(teamId);
        }
        join();
      },[]);

    return state.signed_in && <Redirect to={{ pathname: '/home' }} />
};


export default JoinTeamPage;