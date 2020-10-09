import React, {useEffect} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {joinTeam} from '../../utils/team/team';


const JoinTeamPage = () => {

    function selector(store) {
        return {
          id: store.user.id ? store.user.id : 14,
          signed_in: store.status.signed_in,
          teams: store.teams,
          selected: store.status.selected_team,
          selectedTeamId: store.teams && store.status.selected_team ? store.teams[store.status.selected_team] : 1,
        };
      }
    
    const state = useSelector(selector);

    useEffect(() => {
        const join = async () => {
            await joinTeam(state.selectedTeamId, state.id);
        }
        join();
      });

    return state.signed_in ? <Redirect to="/Landing" /> : <Redirect to="/Login" />
};


export default withRouter(JoinTeamPage);