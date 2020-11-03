import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import {Jumbotron, Row, Col, Container, Button} from 'react-bootstrap';
import ItemForm from './ItemForm';
import Confirm from './Confirm';

import { fetchItems } from '../../utils/store/store'

const Management = () => {
    
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState({});
    const [show, setShow] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // TODO: Fix team_id
    const team_id = '8a1addb0-db22-415e-bbfd-1da2dc193e28';

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
      <Row key={`item-options-${elm.item_id}`} className="text-center py-2">
        <Col md={4}>
          {elm.item_id}
        </Col>
        <Col md={1}>
          {elm.active ? "Active" : "Inactive"}
        </Col>
        <Col md={3}>
          {elm.name}
        </Col>
        <Col md={2}>
          <Button variant="info" onClick={() => handleDetails(elm)}>Edit Details</Button>
        </Col>
        <Col md={2}>
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
          teamId={team_id}
          refresh={refresh}
        />
        <Jumbotron className="text-center">
          <h3>Store Manager</h3>
          <div className="pt-3">
            <Button onClick={() => handleDetails({})}>Add Item</Button>
            <Link to={`/${team_id}/store`} className="ml-4"> 
              <Button>View the store</Button>
            </Link>
          </div>
        </Jumbotron>
        <Container className="mb-4">
          <Row className="text-center py-2 border-bottom h5">
            <Col md={4}>
              Item ID
            </Col>
            <Col md={1}>
              Status
            </Col>
            <Col md={3}>
              Item Name
            </Col>
            <Col md={2}>
              Edit item
            </Col>
            <Col md={2}>
              Delete
            </Col>
          </Row>
          {itemMap}
        </Container>
      </div>
    )
};

export default Management;
