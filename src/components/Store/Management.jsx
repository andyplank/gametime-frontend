import React, { useState, useEffect } from 'react'
import {Link, Redirect } from 'react-router-dom';
import {Jumbotron, Row, Col, Container, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ItemForm from './ItemForm';
import Confirm from './Confirm';

import { fetchItems } from '../../utils/store/store'

const Management = () => {
    
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState({});
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

  if(team_id===0) return (<Redirect to='/' />);

  const refresh = () => {
    fetchItems(setItems, team_id);
  }
  
  useEffect(() => {
    refresh();
  }, [])

  const handleDetails = (item) => {
    setSelected(item);
    setShowDetails(true);
  }

  const handleDelete = (item) => {
    setSelected(item);
    setShow(true);
  }

  const itemMap = items.map((elm) => (
    <Row key={`item-options-${elm.item_id}`} className="py-2">
      <Col md={3} className="pb-2">
        <small>{elm.item_id}</small>
      </Col>
      <Col md={1} className="pb-2">
        {elm.active ? "Active" : "Inactive"}
      </Col>
      <Col md={3} className="pb-2">
        {elm.name}
      </Col>
      <Col md={2} className="pb-2">
        $
        {elm.price.toFixed(2)}
      </Col>
      <Col md={2} className="pb-2">
        <Button variant="info" onClick={() => handleDetails(elm)}>Edit Details</Button>
      </Col>
      <Col md={1} className="pb-2">
        <Button variant="danger" onClick={() => handleDelete(elm)}>Delete</Button>
      </Col>
    </Row>
  ));

  return (
    <div className="fill-vert">
      <Confirm 
        show={show}
        setShow={setShow}
        item={selected}
        team_id={team_id}
        refresh={refresh}
      />
      <ItemForm
        show={showDetails} 
        setShow={setShowDetails}
        item={selected}
        isNew={
          selected.name === undefined
        }
        team_id={team_id}
        refresh={refresh}
      />
      <Jumbotron className="text-center">
        <h3>Store Manager</h3>
        <div className="pt-3">
          <Button onClick={() => handleDetails({})}>Add Item</Button>
          <Link to={`/team/${team_id}/store`} className="mx-4"> 
            <Button>View the store</Button>
          </Link>
          <Link to='/manage/orders'> 
            <Button>View Orders</Button>
          </Link>
        </div>
      </Jumbotron>
      <Container className="mb-4 text-center text-md-left">
        <Row className="py-2 border-bottom h5">
          <Col md={3}>
            Item ID
          </Col>
          <Col md={1}>
            Status
          </Col>
          <Col md={3}>
            Item Name
          </Col>
          <Col md={2}>
            Price
          </Col>
          <Col md={2}>
            Edit item
          </Col>
          <Col md={1}>
            Delete
          </Col>
        </Row>
        {itemMap}
      </Container>
    </div>
  )
};

export default Management;
