import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { DoesUserHavePermission } from "../../../utils/AuthHelper";
import { editFoodType } from "../../../store/actions";
import Accordion from "react-bootstrap/Accordion";
import { GetValidationResult } from "../../../utils/ValidationHelper";
import InlineLoading from "../../../components/inline-loading";
import Loading from "../../../components/loading/Loading";
import ValidationFeedback from "../../../components/validation-feedback";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FoodTypeServices from "../../../services/food-type.services";
import Banner from "../../../components/banner/Banner";

const FoodTypeEdit = ({
  auth,
  languages,
  isEditingFoodType,
  editingFoodTypeFailed,
  editingFoodTypeSucceed,
  editFoodTypeResponseMessages,
  editFoodType,
}) => {
  const [preloadingSucceed, setPreloadingSucceed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [foodTypeTranslations, setFoodTypeTranslations] = useState(
    languages.map((language) => {
      return { languageId: language.id, id: 0 };
    })
  );
  let history = useHistory();
  const MySwal = withReactContent(Swal);
  const { foodTypeId } = useParams();

  useEffect(() => {
    if (
      DoesUserHavePermission(auth.permissions, "FoodType_Update") &&
      DoesUserHavePermission(auth.permissions, "FoodType_Read")
    ) {
      FoodTypeServices.GetFoodType(foodTypeId, auth.token)
        .then((response) => {
          response = response.data;
          if (response.success) {
            response.foodTypeTranslations.forEach((element) => {
              handleChangeTranslations(element.languageId, "id", element.id);
              handleChangeTranslations(
                element.languageId,
                "name",
                element.name
              );
            });
            setPreloadingSucceed(true);
          } else {
            setPreloadingSucceed(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          setPreloadingSucceed(false);
          setLoading(false);
        });
    } else {
      setPreloadingSucceed(false);
      setLoading(false);
    }
  }, [foodTypeId]);

  useEffect(() => {
    if (editingFoodTypeSucceed) {
      history.push("/dashboard/food-type");
    }
  }, [editingFoodTypeSucceed]);

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
      {loading ? (
        <Loading></Loading>
      ) : DoesUserHavePermission(auth.permissions, "FoodType_Update") ? (
        <>
          {preloadingSucceed ? (
            <>
              <h2>Edit Food Type</h2>
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
                                editingFoodTypeFailed,
                                editFoodTypeResponseMessages,
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
                              detect={editingFoodTypeFailed}
                              responseMessages={editFoodTypeResponseMessages}
                              name={language.name + "_Name"}
                            />
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>

                <div className="col-12">
                  {isEditingFoodType ? (
                    <>
                      <button
                        type="button"
                        disabled
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <InlineLoading />
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        editFoodType({
                          foodTypeId: foodTypeId,
                          foodTypeTranslations: foodTypeTranslations.filter(
                            (a) => a.name
                          ),
                        });
                      }}
                      className="btn btn-primary"
                    >
                      Edit
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
            <div>
              <Banner
                title="Error"
                subtitle="Unable to load the content. Please try again later."
              >
                <Link to="/dashboard/foodType" className="btn-primary">
                  Back to index
                </Link>
              </Banner>
            </div>
          )}
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
    isEditingFoodType,
    editingFoodTypeFailed,
    editingFoodTypeSucceed,
    editFoodTypeResponseMessages,
  },
}) => {
  return {
    auth,
    languages,
    isEditingFoodType,
    editingFoodTypeFailed,
    editingFoodTypeSucceed,
    editFoodTypeResponseMessages,
  };
};

export default connect(mapStateToProps, { editFoodType })(FoodTypeEdit);
