import React from "react";
import { connect } from "react-redux";
import { handleToggleIngredientModal } from "../../store/actions";
import GetResourceValue from "../../utils/LanguageResourceHelper";
import "./IngredientModal.scss";

const IngredientModal = ({
  selectedLanguage,
  resources,
  selectedIngredient,
  showIngredientModal,
  handleToggleIngredientModal,
}) => {
  var letterSpacing = "";
  if (selectedLanguage.letterSpacing) {
    letterSpacing = "letter-spacing";
  }

  return (
    showIngredientModal && (
      <div className="ingredient-modal">
        <div className="ingredient-modal-body">
          <div className="card text-center">
            {/* <div className="card-header">
       {selectedIngredient.name}
     </div> */}
            <div className="card-body">
              <p>{selectedIngredient.name}</p>

              <img
                src={selectedIngredient.photo}
                className="border border-dark p-1"
                alt={selectedIngredient.name}
              ></img>
            </div>
            <div className="card-footer text-muted">
              <button
                type="button"
                className={`btn btn-primary ${letterSpacing}`}
                data-test-id="close-ingredient-modal"
                onClick={handleToggleIngredientModal}
              >
                <i className="fa fa-close me-2" aria-hidden="true"></i>
                {GetResourceValue(resources, "IngredientModal_Close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = ({
  language: { selectedLanguage, resources },
  ingredient: { showIngredientModal, selectedIngredient },
}) => {
  return {
    selectedLanguage,
    resources,
    selectedIngredient,
    showIngredientModal,
  };
};

export default connect(mapStateToProps, { handleToggleIngredientModal })(
  IngredientModal
);
