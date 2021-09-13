import React from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useFormValidation } from '../../hooks/useFormValidation';
import LoaderError from './LoaderError';
import classes from './TwoColumnsForm.module.css';

const TwoColumnsForm = ({ data, setData, dataPrint, submitAction, btnText, isLoading, error }) => {

  const [submit, validated] = useFormValidation(async () => {
    await submitAction();
  });

  return (
    <div className="mt-4">
      <LoaderError isLoading={isLoading} error={error} />
      <Form noValidate validated={validated} onSubmit={submit} >
        {Object.keys(dataPrint).map(key =>
          <Form.Group as={Row} className="mb-3" controlId={`form${key}`} key={`form${key}`}>
            <Form.Label className={classes.lbl} column sm="3" >{dataPrint[key].name}</Form.Label>
            <Col sm="9">
              <InputGroup className="mb-3">

                <Form.Control
                  required={dataPrint[key].required}
                  type={dataPrint[key].type}
                  placeholder={`Введите ${dataPrint[key].name}`}
                  value={data[key]}
                  onChange={e => { setData({ ...data, [key]: e.target.value }) }}
                />
                <Form.Control.Feedback type="invalid">Введите {dataPrint[key].name}</Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          {btnText}
        </Button>

      </Form>
    </div >
  )
}

export default TwoColumnsForm;
