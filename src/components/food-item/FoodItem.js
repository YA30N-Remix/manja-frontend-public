import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IngredientList from "../ingredient-list/IngredientList";

const FoodItem = ({
  food: {
    foodId,
    slug,
    thumbnail,
    price,
    taste,
    temperature,
    name,
    ingredients,
  },
  selectedLanguage,
  restaurantSlug,
}) => {
  var direction = "";
  var align = "text-end";
  if (selectedLanguage.rtl) {
    direction = "rtl";
    align = "text-start";
  }
  return (
    <div className={`row m-2 border-bottom ${direction}`}>
      <div className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-3 ">
        <img
          src={thumbnail}
          className="border w-100 border-dark my-4 p-1"
          alt={name}
        ></img>
      </div>
      <div className="col-12 col-sm-8 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-3">
        <h2 className="mt-2">{name}</h2>
        <IngredientList ingredients={ingredients}></IngredientList>
        <p className="mt-5">
          <span className="bg-secondary text-white p-2 me-2 rounded-pill">
            {taste}
          </span>
          <span className="bg-secondary text-white p-2 me-2 rounded-pill">
            {temperature}
          </span>
        </p>

        <p className={align}>{price} $</p>
        <p className="text-center">
          <Link
            to={`/restaurant/${restaurantSlug}/food/${slug}`}
            className="btn btn-primary"
          >
            <i className="fa fa-search"></i>
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ language: { selectedLanguage } }) => {
  return {
    selectedLanguage,
  };
};

export default connect(mapStateToProps)(FoodItem);
