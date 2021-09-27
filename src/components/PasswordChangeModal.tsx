import React, { useState, useEffect, useRef, FC } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useFormFetching } from "../hooks/useFormFetching";
import LoadingButton from './UI/LoadingButton';
import UserService from "../services/UserService";

interface props {
  userId: number;
}

const PasswordChangeModal: FC<props> = ({ userId }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false
    }
  }, []);

  const [submit, isLoadingUpdate, errorUpdate, clearError, validated] = useFormFetching(async () => {
    await UserService.patchUser(userId, { password });
    if (isMounted.current) {
      setPassword('');
      setConfirmation('');
      handleClose();
    }

  });

  return (
    <>
      <div className="d-grid">
        <Button variant="link" onClick={handleShow}>
          Сменить пароль
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Сменить пароль</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={submit}>
          <Modal.Body>

            <Form.Group className="mb-3" controlId={`formPassword`}>
              <Form.Label>Пароль</Form.Label>

              <InputGroup hasValidation className="mb-3">

                <Form.Control
                  required
                  type="password"
                  placeholder={`Введите пароль`}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}

                />
                <Form.Control.Feedback type="invalid">Введите пароль</Form.Control.Feedback>
              </InputGroup>

            </Form.Group>

            <Form.Group className="mb-3" controlId={`formPasswordAgain`}>
              <Form.Label>Подтверждение пароля</Form.Label>

              <InputGroup hasValidation className="mb-3">

                <Form.Control
                  required
                  type="password"
                  placeholder={`Введите пароль`}
                  value={confirmation}
                  onChange={e => {
                    setConfirmation(e.target.value)
                  }}
                  isInvalid={password !== confirmation}
                />
                <Form.Control.Feedback type="invalid">Пароли не совпадают</Form.Control.Feedback>
              </InputGroup>

            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <LoadingButton isLoading={isLoadingUpdate} loadingText="Загрузка..." text="Сменить пароль"/>

          </Modal.Footer>
        </Form>

      </Modal>
    </>
  )
}

export default PasswordChangeModal;