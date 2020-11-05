import React, {useEffect, useState} from 'react';
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

    const [team, setTeam] = useState(null);

    useEffect(() => {
        const join = async () => {
          let team_id = "";
          team_id += window.location.href;
          team_id = team_id.substr(team_id.lastIndexOf("/")+1);
          setTeam(team_id);
          await joinTeam(team_id);
        }
        join();
      },[]);

    return (state.signed_in && team) && <Redirect to={{ pathname: `/team/${team}/home` }} />
};


export default JoinTeamPage;
