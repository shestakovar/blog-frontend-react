import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import LoaderError from './LoaderError';
import { useFormValidation } from '../../hooks/useFormValidation';
import classes from './UserForm.module.css';

const UserForm = ({ data, setData, dataPrint, setDataPrint, submitAction, isLoading, error }) => {
  const [initialState, setInitialState] = useState(dataPrint);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false }
  }, []);

  const [submit, validated] = useFormValidation(async () => {
    await submitAction();
    if (isMounted.current) setDataPrint(initialState);
  });

  return (
    <div className={classes.user_form}>
      <LoaderError isLoading={isLoading} error={error} />
      <Form noValidate validated={validated} onSubmit={submit} >
        {Object.keys(dataPrint).map(key =>
          <Form.Group hidden={dataPrint[key].hidden} as={Row} className="mb-3" controlId={`form${key}`} key={`form${key}`}>
            <Form.Label className={classes.lbl} column sm="4" >{dataPrint[key].name}</Form.Label>
            <Col sm="8">
              <InputGroup className="mb-3">

                <Form.Control
                  required={dataPrint[key].required}
                  type={dataPrint[key].type}
                  readOnly={dataPrint[key].readOnly}
                  plaintext={dataPrint[key].plainText}
                  placeholder={`Введите ${dataPrint[key].name}`}
                  value={data[key]}
                  onChange={e => { setData({ ...data, [key]: e.target.value }) }}
                />
                {!dataPrint[key].plainText
                  ?
                  <Button
                    type="submit"
                    variant="outline-secondary"
                    id={`button-addon1-${key}`}
                    onClick={(e) => {
                      if (dataPrint[key].readOnly) {
                        e.preventDefault();
                        setDataPrint({ ...dataPrint, [key]: { ...dataPrint[key], readOnly: !dataPrint[key].readOnly } });
                      }

                    }
                    }
                  >
                    Изменить
                  </Button>
                  : null
                }
                <Form.Control.Feedback type="invalid">Введите {dataPrint[key].name}</Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>
        )}
      </Form>
    </div >
  )
}

export default UserForm;
