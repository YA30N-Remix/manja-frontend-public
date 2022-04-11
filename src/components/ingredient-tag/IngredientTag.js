import React from "react";
import { connect } from "react-redux";
import {
  selectIngredient,
  handleToggleIngredientModal,
} from "../../store/actions";
import "./IngredientTag.scss";

const IngredientTag = ({
  selectIngredient,
  handleToggleIngredientModal,
  ingredient,
}) => {
  return (
    <div
      className="col text-nowrap ingredient-tag bg-secondary text-center align-middle text-white p-2 m-1 rounded-pill"
      onClick={() => {
        selectIngredient(ingredient);
        handleToggleIngredientModal();
      }}
    >
      {ingredient.name}
    </div>
  );
};

export default connect(null, {
  selectIngredient,
  handleToggleIngredientModal,
})(IngredientTag);
