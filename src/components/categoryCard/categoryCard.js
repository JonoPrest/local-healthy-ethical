import React from "react";

import "./categoryCard.scss";

import { Card, CardImgOverlay, CardImg } from "reactstrap";

const noImage = require("assets/img/no-image.jpg");

const CategoryCard = ({ title, imgUrl }) => {
  return (
    <Card className="bg-dark text-white categoryCard">
      <CardImg
        src={imgUrl ? imgUrl : noImage}
        alt="..."
      />
      <CardImgOverlay>
        <h1>{title}</h1>
      </CardImgOverlay>
    </Card>
  );
};

export default CategoryCard;
