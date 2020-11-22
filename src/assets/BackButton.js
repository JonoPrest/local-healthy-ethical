import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const BackButton = () => {
  const history = useHistory();
  return (
    <Button
      className="m-4 position-absolute"
      style={{ left: "5vw" }}
      color="neutral"
      onClick={() => history.goBack()}
    >
      <i className="nc-icon nc-minimal-left mr-1" /> Back
    </Button>
  );
};

export default BackButton;
