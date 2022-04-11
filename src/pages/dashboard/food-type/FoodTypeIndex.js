import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DoesUserHavePermission } from "../../../utils/AuthHelper";
import {
  getFoodTypes,
  prepareCreateFoodType,
  prepareEditFoodType,
  deleteFoodType,
  resetAfterDeleteFoodType,
} from "../../../store/actions";
import Loading from "../../../components/loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import loadingGif from "../../../images/gif/loading-arrow.gif";

const FoodTypeIndex = ({
  auth,
  foodTypes,
  isGettingFoodTypes,
  gettingFoodTypesFailed,
  isDeletingFoodType,
  deletingFoodTypeFailed,
  deletingFoodTypeSucceed,
  getFoodTypes,
  prepareCreateFoodType,
  prepareEditFoodType,
  deleteFoodType,
  resetAfterDeleteFoodType,
}) => {
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    if (DoesUserHavePermission(auth.permissions, "FoodType_Read")) {
      getFoodTypes();
    }
  }, [getFoodTypes, auth.permissions]);
  useEffect(() => {
    if (isDeletingFoodType) {
      MySwal.fire({
        title: "The item is deleting",
        icon: "info",
        html: `<img src="${loadingGif}"/>`,
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
    if (deletingFoodTypeFailed) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#af9a7d",
      });
    }
    if (deletingFoodTypeSucceed) {
      MySwal.fire({
        title: "Deleted!",
        text: "The item has been deleted.",
        icon: "success",
        confirmButtonColor: "#af9a7d",
      });
      resetAfterDeleteFoodType();
    }
  }, [isDeletingFoodType, deletingFoodTypeFailed, deletingFoodTypeSucceed]);
  return (
    <div className="d-flex flex-column flex-fill p-5">
      {DoesUserHavePermission(auth.permissions, "FoodType_Read") ? (
        <>
          <h2>Food Types</h2>
          <div className="d-flex justify-content-end pb-4">
            {DoesUserHavePermission(auth.permissions, "FoodType_Create") ? (
              <Link
                to="/dashboard/food-type/create"
                onClick={() => prepareCreateFoodType()}
                className="btn-primary"
              >
                Create Food Type
              </Link>
            ) : null}
          </div>
          <div className="d-flex justify-content-center">
            {isGettingFoodTypes ? (
              <Loading></Loading>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th className="text-center" scope="col">
                        Name
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {gettingFoodTypesFailed ? (
                      <tr>
                        <td className="text-center" colSpan="3">
                          An error happened in getting the foodTypes!
                        </td>
                      </tr>
                    ) : (
                      foodTypes.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td className="text-center">{item.name}</td>
                          <td className="text-center">
                            {DoesUserHavePermission(
                              auth.permissions,
                              "FoodType_Update"
                            ) ? (
                              <Link
                                to={`/dashboard/food-type/edit/${item.id}`}
                                onClick={() => prepareEditFoodType()}
                                className="p-1"
                              >
                                <i className="fa fa-edit"></i>
                              </Link>
                            ) : null}
                            {DoesUserHavePermission(
                              auth.permissions,
                              "FoodType_Delete"
                            ) ? (
                              <span
                                className="cursor-pointer p-1"
                                onClick={() => {
                                  MySwal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to retrive this item!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    cancelButtonColor: "#6c757d",
                                    confirmButtonColor: "#af9a7d",
                                    confirmButtonText: "Yes, I am sure!",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      deleteFoodType(item.id);
                                    }
                                  });
                                }}
                              >
                                <i className="fa fa-trash text-danger"></i>
                              </span>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = ({
  user: { auth },
  foodType: {
    foodTypes,
    isGettingFoodTypes,
    gettingFoodTypesFailed,
    isDeletingFoodType,
    deletingFoodTypeFailed,
    deletingFoodTypeSucceed,
  },
}) => {
  return {
    auth,
    foodTypes,
    isGettingFoodTypes,
    gettingFoodTypesFailed,
    isDeletingFoodType,
    deletingFoodTypeFailed,
    deletingFoodTypeSucceed,
  };
};

export default connect(mapStateToProps, {
  getFoodTypes,
  prepareCreateFoodType,
  prepareEditFoodType,
  deleteFoodType,
  resetAfterDeleteFoodType,
})(FoodTypeIndex);
