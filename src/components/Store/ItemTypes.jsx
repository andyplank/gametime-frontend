/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import { Button, Form, Col } from 'react-bootstrap';

const ItemTypes = (props) => {

    const {types, setTypes} = props;
    const [newType, setNewType] = useState('');

    const addType = () => {
      if (newType==='') {
        return;
      }
      const typeObject = {
        label: newType, 
        type_id: Math.floor(Math.random() * Math.floor(1000))
      };
      const temp = Array.isArray(types) 
          ? types.concat(typeObject) 
          : [typeObject];
      setTypes(temp);
      setNewType(''); 
    }
    
    const removeType = (index) => {
      if(index > types.length){
          return;
      }
      const temp = [...types];
      temp.splice(index, 1);
      setTypes(temp);
    };

    const typeMap = types.map((elm, index) => (
      <Form.Row key={`item-type-${elm.label}-${elm.type_id}`} className="d-flex align-items-end pt-1">
        <Col>
          <Form.Label className="pl-2">{elm.label}</Form.Label>
        </Col>
        <Col>
          <Button variant="danger" onClick={() => {removeType(index)}}>Remove</Button>
        </Col>
      </Form.Row>
    ));

    return (
      <Form.Group>
        <Form.Row className="d-flex align-items-end">
          <Col>
            <Form.Label>New type name</Form.Label>
            <Form.Control 
              placeholder="Small"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
          </Col>
          <Col>
            <Button onClick={() => {addType()}}>Add</Button>
          </Col>
        </Form.Row>
        { typeMap}
      </Form.Group>
    );
}

export default ItemTypes;
