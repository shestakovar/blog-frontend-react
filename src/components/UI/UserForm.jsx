import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, InputGroup, Image, Ratio } from 'react-bootstrap';
import LoaderError from './LoaderError';
import { useFormValidation } from '../../hooks/useFormValidation';
import classes from './UserForm.module.css';
import noAvatar from '../../img/no-avatar.svg'

const UserForm = ({ data, setData, dataPrint, setDataPrint, submitAction, isLoading, error, canBeChanged, clearError }) => {
  const [initialState, setInitialState] = useState(dataPrint);
  const isMounted = useRef(false);
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false }
  }, []);

  const [submit, validated] = useFormValidation(async () => {
    await submitAction(data, newAvatar);
    if (isMounted.current) setDataPrint(initialState);
  });

  return (
    <div className={classes.user_form}>
      <LoaderError isLoading={isLoading} error={error} closeError={clearError} />
      <Form noValidate validated={validated} onSubmit={submit}>
        <Row>

          <Col sm>

            <Ratio aspectRatio="1x1" className={`my-3 ${classes.avatar_img__wrapper}`}>
              {data.avatar
                ? <Image src={`${data.avatar}?${new Date().getTime()}`} roundedCircle className={classes.avatar__img} />
                : <Image src={noAvatar} roundedCircle className={classes.avatar__img} />
              }
            </Ratio>

            {canBeChanged && <Form.Group controlId="formFile" className="mb-3">

              <InputGroup className="mb-3">

                <Form.Control type="file" onChange={e => { setNewAvatar(e.target.files[0]) }} />
                <Button
                  type="submit"
                  variant="outline-secondary"
                  id={`button-addon1-file`}
                >
                  Обновить
                </Button>
              </InputGroup>
            </Form.Group>}

          </Col>


          <Col sm>

            {Object.keys(dataPrint).map(key =>
              <Form.Group hidden={dataPrint[key].hidden} as={Row} className="mb-3" controlId={`form${key}`} key={`form${key}`}>
                <Form.Label className={classes.lbl} column sm="4" >{dataPrint[key].name}</Form.Label>
                <Col sm="8">
                  <InputGroup className="mb-3">

                    <Form.Control
                      required={dataPrint[key].required}
                      type={dataPrint[key].type}
                      readOnly={dataPrint[key].readOnly}
                      plaintext={dataPrint[key].plainText || !canBeChanged}
                      placeholder={`Введите ${dataPrint[key].name}`}
                      value={data[key]}
                      onChange={e => { setData({ ...data, [key]: e.target.value }) }}
                    />
                    {!dataPrint[key].plainText && canBeChanged
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
          </Col>
        </Row>
      </Form>
    </div >
  )
}

export default UserForm;
