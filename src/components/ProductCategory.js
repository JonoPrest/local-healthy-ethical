import React from "react";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const ProductCategory = () => {
  return (
    <div className="d-flex overflow-auto" style={{ width: "800px" }}>
      <Card className="mx-3" style={{ width: "20rem", minWidth: "20rem" }}>
        <CardImg
          top
          src="https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80"
          alt="..."
        />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button color="primary">Go somewhere</Button>
        </CardBody>
      </Card>

      <Card className="mx-3" style={{ width: "20rem", minWidth: "20rem"  }}>
        <CardImg
          top
          src="https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          alt="..."
        />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button color="primary">Go somewhere</Button>
        </CardBody>
      </Card>

      <Card className="mx-3" style={{ width: "20rem", minWidth: "20rem"  }}>
        <CardImg
          top
          src="https://images.unsplash.com/photo-1481900369621-54a7facacc6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80"
          alt="..."
        />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button color="primary">Go somewhere</Button>
        </CardBody>
      </Card>

      <Card className="mx-3" style={{ width: "20rem", minWidth: "20rem"  }}>
        <CardImg
          top
          src="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80"
          alt="..."
        />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button color="primary">Go somewhere</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCategory;
