import React from 'react';
import { Alert } from "react-bootstrap";

const MyError = ( {error, closeError} ) => {
  if (error)
    if (typeof error === 'object')
      return (
        <div className="errors">

          <Alert variant="danger" onClose={() => closeError()} dismissible>
            {Object.entries(error).map(([k, v]) => <p key={k}>{k} : {v}</p>)}
          </Alert>

        </div>
      )
    else
      return (
        <Alert variant="danger" onClose={() => closeError()} dismissible>{error}</Alert>
      )
  return null;
};

export default MyError;
