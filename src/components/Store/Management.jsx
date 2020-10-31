import React, { useState, useEffect } from 'react'
import {Jumbotron, Row, Col, Container, Button} from 'react-bootstrap';
import UploadPicture from '../UploadPicture/UploadPicture';
import ItemForm from './ItemForm';
import Confirm from './Confirm';

import { fetchItems } from '../../utils/store/store'

const Management = () => {
    
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState({});
    const [show, setShow] = useState(false);

    const refresh = () => {
        fetchItems(setItems, 0);
    }
    
    useEffect(() => {
        refresh();
    }, [])

    async function onSavePicture(picture){
        const formattedPicture = `data:image/jpeg;base64,${picture}`
        console.log(formattedPicture);
    }
  
    const handleDetails = (item) => {
        console.log(item);
    }

    const handleShow = (item) => {
        console.log(item);
    }

    const handleDelete = (item) => {
        console.log(item);
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
        <ItemForm />
        <UploadPicture savePicture={onSavePicture} />
      </div>
    )
};

export default Management;