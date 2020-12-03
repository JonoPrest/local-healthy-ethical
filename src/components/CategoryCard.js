import React from "react";

import "./CategoryCard.scss";

import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

const noImage = require("assets/img/no-image.jpg");

const CategoryCard = ({ title, imgUrl }) => {
  return (
    <Card className="bg-primary categoryCard">
      <CardImg src={imgUrl ? imgUrl : noImage} alt="..." />
      <CardBody>
        <CardTitle className="title">
          <h2>{title}</h2>
        </CardTitle>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
