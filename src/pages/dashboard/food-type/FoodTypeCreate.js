import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { DoesUserHavePermission } from "../../../utils/AuthHelper";
import { createFoodType } from "../../../store/actions";
import Accordion from "react-bootstrap/Accordion";
import { GetValidationResult } from "../../../utils/ValidationHelper";
import InlineLoading from "../../../components/inline-loading";
import ValidationFeedback from "../../../components/validation-feedback";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const FoodTypeCreate = ({
  auth,
  languages,
  isCreatingFoodType,
  creatingFoodTypeFailed,
  creatingFoodTypeSucceed,
  createFoodTypeResponseMessages,
  createFoodType,
}) => {
  const [foodTypeTranslations, setFoodTypeTranslations] = useState(
    languages.map((language) => {
      return { languageId: language.id };
    })
  );
  let history = useHistory();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (creatingFoodTypeSucceed) {
      history.push("/dashboard/food-type");
    }
  }, [creatingFoodTypeSucceed]);

  const handleChangeTranslations = (languageId, name, value) => {
    var tempFoodTypeTranslations = [...foodTypeTranslations];

    var tempFoodTypeTranslation = tempFoodTypeTranslations.find(
      (item) => item.languageId === languageId
    );

    tempFoodTypeTranslation[name] = value;

    setFoodTypeTranslations(tempFoodTypeTranslations);
  };

  return (
    <div className="d-flex flex-column flex-fill p-5">
      {DoesUserHavePermission(auth.permissions, "FoodType_Create") ? (
        <>
          <h2>Create Food Type</h2>
          <form className="row g-3 pb-5">
            <Accordion className="pt-2">
              {languages.map((language, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>{language.name}</Accordion.Header>
                  <Accordion.Body>
                    <div className={`row g-3 ${language.rtl ? "rtl" : ""}`}>
                      <div className="col-md-6">
                        <label for="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${GetValidationResult(
                            creatingFoodTypeFailed,
                            createFoodTypeResponseMessages,
                            language.name + "_Name"
                          )}`}
                          id="name"
                          value={
                            foodTypeTranslations[index].name
                              ? foodTypeTranslations[index].name
                              : ""
                          }
                          onChange={(event) =>
                            handleChangeTranslations(
                              language.id,
                              "name",
                              event.target.value
                            )
                          }
                        ></input>
                        <ValidationFeedback
                          detect={creatingFoodTypeFailed}
                          responseMessages={createFoodTypeResponseMessages}
                          name={language.name + "_Name"}
                        />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            <div className="col-12">
              {isCreatingFoodType ? (
                <>
                  <button type="button" disabled className="btn btn-primary">
                    Create
                  </button>
                  <InlineLoading />
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    createFoodType({
                      foodTypeTranslations: foodTypeTranslations.filter(
                        (a) => a.name
                      ),
                    });
                  }}
                  className="btn btn-primary"
                >
                  Create
                </button>
              )}
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  MySwal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to retrive the changes you made!",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonColor: "#6c757d",
                    confirmButtonColor: "#af9a7d",
                    confirmButtonText: "Yes, I am sure!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      history.push("/dashboard/food-type");
                    }
                  });
                }}
              >
                Back to index
              </button>
            </div>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = ({
  user: { auth },
  language: { languages },
  foodType: {
    isCreatingFoodType,
    creatingFoodTypeFailed,
    creatingFoodTypeSucceed,
    createFoodTypeResponseMessages,
  },
}) => {
  return {
    auth,
    languages,
    isCreatingFoodType,
    creatingFoodTypeFailed,
    creatingFoodTypeSucceed,
    createFoodTypeResponseMessages,
  };
};

export default connect(mapStateToProps, { createFoodType })(FoodTypeCreate);
