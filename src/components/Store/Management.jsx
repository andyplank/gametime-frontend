import React, { useState, useEffect } from 'react'
import {Jumbotron, Row, Col, Container, Button} from 'react-bootstrap';
import ItemForm from './ItemForm';
import Confirm from './Confirm';

import { fetchItems, updateItem } from '../../utils/store/store'

const Management = () => {
    
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState({});
    const [show, setShow] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // TODO: Fix team_id
    const team_id = 0;

    const refresh = () => {
        fetchItems(setItems, 0);
    }
    
    useEffect(() => {
        refresh();
    }, [])

    const handleDetails = (item) => {
      setSelected(item);
      setShowDetails(true);
      console.log(item);
    }

    const handleShow = async (item) => {
        item.active = !item.active;
        const res = await updateItem(team_id, item);
        if (res===true){
            console.log("nice");
        }
    }

    const handleDelete = (item) => {
        setSelected(item);
        setShow(true);
    }

    const itemMap = items.map((elm, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Row key={`item-options-${index}`} className="text-center py-2">
        <Col>
          {elm.name}
        </Col>
        <Col>
          <Button onClick={() => handleDetails(elm)}>Edit Details</Button>
        </Col>
        <Col>
          <Button onClick={() => handleShow(elm)}>{elm.hidden ? "Show" : "Hide"}</Button>
        </Col>
        <Col>
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
        />
        <Jumbotron className="text-center">
          <h3>Store Manager</h3>
        </Jumbotron>
        <Container>
          <Row className="text-center py-2 border-bottom h5">
            <Col>
              Item Name
            </Col>
            <Col>
              Edit item
            </Col>
            <Col>
              Show/Hide
            </Col>
            <Col>
              Delete
            </Col>
          </Row>
          {itemMap}
        </Container>
        <ItemForm show={showDetails} setShow={setShowDetails} />
      </div>
    )
};

export default Management;