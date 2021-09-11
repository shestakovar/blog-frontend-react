import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import LoaderError from './LoaderError';
import { useFormFetching } from '../../hooks/useFormFetching';
import classes from './TwoColumnsForm.module.css';

const TwoColumnsEditForm = ({ data, setData, dataPrint, setDataPrint, callback }) => {
  const [initialState, setInitialState] = useState(dataPrint);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false }
  }, []);

  const [updateData, isUpdatingData, updateDataError, validated] = useFormFetching(async () => {
    await callback();
    if (isMounted.current) setDataPrint(initialState);
  })

  return (
    <div className="mt-4">
      <LoaderError isLoading={isUpdatingData} error={updateDataError} />
      <Form noValidate validated={validated} onSubmit={updateData} >
        {Object.keys(dataPrint).map(key =>
          <Form.Group as={Row} className="mb-3" controlId={`form${key}`} key={`form${key}`}>
            <Form.Label className={classes.lbl} column sm="2" >{dataPrint[key].name}</Form.Label>
            <Col sm="10">
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

export default TwoColumnsEditForm;
