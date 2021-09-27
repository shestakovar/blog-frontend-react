import React, { FC } from 'react';
import { Alert } from "react-bootstrap";

interface propsWithError {
  error: string | object | null;
  closeError?: never;
}

interface propsWithCloseError {
  error: string | object | null;
  closeError: () => void;
}

export type MyErrorProps = propsWithError | propsWithCloseError;

const MyError: FC<MyErrorProps> = ({ error, closeError }) => {
  if (error)
    if (typeof error === 'object')
      if (closeError)
        return (
          <div className="errors">
            <Alert variant="danger" onClose={() => closeError()} dismissible>
              {Object.entries(error).map(([k, v]) => <p key={k}>{k} : {v}</p>)}
            </Alert>
          </div>
        )
      else
        return (
          <div className="errors">
            <Alert variant="danger">
              {Object.entries(error).map(([k, v]) => <p key={k}>{k} : {v}</p>)}
            </Alert>
          </div>
        )
    else if (closeError)
      return (
        <Alert variant="danger" onClose={() => closeError()} dismissible>{error}</Alert>
      )
    else
      return (
        <Alert variant="danger" >{error}</Alert>
      )
  return null;
};

export default MyError;
