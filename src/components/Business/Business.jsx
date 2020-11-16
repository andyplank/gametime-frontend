import React, {useState, useEffect} from "react";
import { Button, Jumbotron } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Confirm from '../Common/Confirm';

import { fetchSponsorships, fetchPromotions, deleteSponsorship, deletePromotion } from '../../utils/business/business'

const Business = () => {

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
      return 0;
    }
    return 0;
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
      : () => deleteSponsorship(team_id, item.sponsorship_id)
    setSelected({
      ...item,
      deleteFunc: deleteFunc
    });
    setShow(true);
  }

  const sponsorshipsContent = sponsorships.map((elm) => (
    <div>
      <Button variant="danger" onClick={() => handleDelete(elm)}>Delete</Button>
    </div>
  ));
  const promotionsContent = promotions.map((elm) => (
    <div>
      <Button variant="danger" onClick={() => handleDelete(elm)}>Delete</Button>
    </div>
  ));

  return (
    <div className="fill-vert text-center">
      <Jumbotron className="text-center">
        <h3>Manage Businesses</h3>
        <div className="pt-3">
          <Link to='sponsorship' className="mx-4"> 
            <Button>Add Sponsorship</Button>
          </Link>
          <Link to='promotions'> 
            <Button>Add Promotion</Button>
          </Link>
        </div>
      </Jumbotron>
      <Confirm 
        show={show}
        setShow={setShow}
        text={selected.name}
        refresh={refresh}
        deleteFunc={selected.deleteFunc}
      />
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
