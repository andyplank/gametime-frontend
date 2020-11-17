import React, {useState, useEffect} from "react";
import { Button, Jumbotron } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Confirm from '../Common/Confirm';

import { fetchSponsorships, fetchPromotions, deleteSponsorship, deletePromotion } from '../../utils/business/business'
import Sponsorship from "./Sponsorship";
import Promotion from './Promotion';

const Business = () => {

  const [showSponsorships, setShowSponsorships] = useState(false);
  const [showPromotions, setShowPromotions] = useState(false);

  const [promotions, setPromotions] = useState([]);
  const [sponsorships, setSponsorships] = useState([]);
  const [selected, setSelected] = useState({name: '', deleteFunc: () => {}});
  const [show, setShow] = useState(false);

  const team_id = useSelector((store) => {
    try {
      if (store.status.signed_in) {
        return store.user.teams[store.status.selected_team].team_id;
      }
    } catch (err) {
      return '0';
    }
    return '0';
  });

  // if(team_id===0) return (<Redirect to='/' />);

  const refresh = () => {
    fetchSponsorships(setSponsorships, team_id);
    fetchPromotions(setPromotions, team_id)
  }
  
  useEffect(() => {
    refresh();
  }, [team_id])

  const handleDelete = (item) => {
    const deleteFunc = item.promotion_id 
      ? () => deletePromotion(team_id, item.promotion_id) 
      : () => deleteSponsorship(team_id, item.sponsor_id)
    setSelected({
      ...item,
      deleteFunc: deleteFunc
    });
    setShow(true);
  }

  const sponsorshipsContent = sponsorships.map((elm) => (
    <div key={elm.sponsor_id}>
      <span>{elm.name}</span>
      <Button variant="danger" onClick={() => handleDelete(elm)}>Delete</Button>
    </div>
  ));
  const promotionsContent = promotions.map((elm) => (
    <div key={elm.promotion_id}>
      <span>{elm.name}</span>
      <Button variant="danger" onClick={() => handleDelete(elm)}>Delete</Button>
    </div>
  ));

  return (
    <div className="fill-vert text-center">
      <Confirm 
        show={show}
        setShow={setShow}
        text={selected.name}
        refresh={refresh}
        deleteFunc={selected.deleteFunc}
      />
      <Sponsorship 
        show={showSponsorships}
        setShow={setShowSponsorships}
        team_id={team_id}
        refresh={refresh}
      />
      <Promotion
        show={showPromotions}
        setShow={setShowPromotions}
        team_id={team_id}
        refresh={refresh}
      />
      <Jumbotron className="text-center">
        <h3>Manage Businesses</h3>
        <div className="pt-3">
          <Button onClick={() => setShowSponsorships(true)}>Add Sponsorship</Button>
          <Button onClick={() => setShowPromotions(true)}>Add Promotion</Button>
        </div>
      </Jumbotron>
      <h4>Current Sponsorships</h4>
      <div className="pt-3">
        {sponsorshipsContent}
      </div>      
      <h4>Current Promotions</h4>
      <div className="pt-3">
        {promotionsContent}
      </div>      
    </div>      
    )
};

export default Business;
