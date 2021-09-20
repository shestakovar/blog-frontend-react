import React from 'react';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useFormValidation } from '../../hooks/useFormValidation';
import classes from './LoginForm.module.css';
import LoadingButton from './LoadingButton';

const RegisterForm = ({ data, setData, dataPrint, submitAction, btnText, error, isLoading }) => {

  const [submit, validated] = useFormValidation(async () => {
    await submitAction();
  });

  return (

    <Form className={classes.auth_form_body} noValidate validated={validated} onSubmit={submit} >
      {Object.keys(dataPrint).map(key =>
        <Form.Group as={Row} className="mb-3" controlId={`form${key}`} key={`form${key}`}>
          <Form.Label className={classes.lbl} column sm="4">{dataPrint[key].name}</Form.Label>
          <Col sm="8">
            <InputGroup hasValidation className="mb-3">
              <Form.Control
                required={dataPrint[key].required}
                type={dataPrint[key].type}
                placeholder={`Введите ${dataPrint[key].name}`}
                value={data[key]}
                onChange={e => { setData({ ...data, [key]: e.target.value }) }}

                isInvalid={error[key]}
              />
              <Form.Control.Feedback type="invalid">
                {error && typeof error === 'object' && error[key]
                  ? error[key]
                  : <React.Fragment>Введите {dataPrint[key].name}</React.Fragment>
                }
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Form.Group>
      )}
      <div className="d-grid">
        <LoadingButton isLoading={isLoading} loadingText="Регистрация..." text={btnText} />
      </div>

    </Form>
  )
}

export default RegisterForm;
