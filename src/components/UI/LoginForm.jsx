import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import LoadingButton from './LoadingButton';
import classes from './LoginForm.module.css';

const LoginForm = ({ data, setData, dataPrint, submitAction, isLoading, validated }) => {
  return (
    <Form className={classes.auth_form_body} noValidate validated={validated} onSubmit={submitAction} >
      {Object.keys(dataPrint).map(key =>
        <Form.Group className="mb-3" controlId={`form${key}`} key={`form${key}`}>
          <Form.Label className={classes.lbl} >{dataPrint[key].name}</Form.Label>

          <InputGroup hasValidation className="mb-3">

            <Form.Control
              required={dataPrint[key].required}
              type={dataPrint[key].type}
              placeholder={`Введите ${dataPrint[key].name}`}
              value={data[key]}
              onChange={e => { setData({ ...data, [key]: e.target.value }) }}
            />
            <Form.Control.Feedback type="invalid">Введите {dataPrint[key].name}</Form.Control.Feedback>
          </InputGroup>

        </Form.Group>
      )}
      <div className="d-grid">
        <LoadingButton isLoading={isLoading} loadingText="Вход..." text="Войти" />
      </div>

    </Form>
  )
}

export default LoginForm;
