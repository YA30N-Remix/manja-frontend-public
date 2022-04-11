import React from "react";
import IngredientTag from "../ingredient-tag";
import "./IngredientList.scss";

const IngredientList = ({ ingredients }) => {
  return (
    <div className="ingredient-container">
      {ingredients.map((ingredient) => (
        <IngredientTag
          key={ingredient.id}
          ingredient={ingredient}
        ></IngredientTag>
      ))}
      <div></div>
    </div>
  );
};

export default IngredientList;
