import { foodTypeConstants } from "../constants";
import FoodTypeServices from "../../services/food-type.services";

export const prepareCreateFoodType = () => {
  return {
    type: foodTypeConstants.PREPARE_CREATE_FOOD_TYPE,
  };
};

export const prepareEditFoodType = () => {
  return {
    type: foodTypeConstants.PREPARE_EDIT_FOOD_TYPE,
  };
};

export const getFoodTypes = () => {
  return (dispatch, getState) => {
    dispatch({ type: foodTypeConstants.WAIT_FOR_GET_FOOD_TYPES });
    const state = getState();

    let token = "";

    if (state.user.auth) {
      token = state.user.auth.token;
    }

    FoodTypeServices.GetFoodTypes(token)
      .then((response) => {
        response = response.data;
        if (response.success) {
          const { foodTypes } = response;
          return dispatch({
            type: foodTypeConstants.GET_FOOD_TYPES_SUCCEED,
            payload: {
              foodTypes,
            },
          });
        } else {
          return dispatch({
            type: foodTypeConstants.GET_FOOD_TYPES_FAILED,
          });
        }
      })
      .catch((err) => {
        return dispatch({
          type: foodTypeConstants.GET_FOOD_TYPES_FAILED,
        });
      });
  };
};

export const createFoodType = (foodType) => {
  return (dispatch, getState) => {
    dispatch({ type: foodTypeConstants.WAIT_FOR_CREATE_FOOD_TYPE });
    const state = getState();

    let token = "";

    if (state.user.auth) {
      token = state.user.auth.token;
    }

    FoodTypeServices.CreateFoodType(foodType, token)
      .then((response) => {
        response = response.data;
        if (response.success) {
          return dispatch({
            type: foodTypeConstants.CREATE_FOOD_TYPE_SUCCEED,
          });
        } else {
          return dispatch({
            type: foodTypeConstants.CREATE_FOOD_TYPE_FAILED,
            payload: {
              responseMessages: response.responseMessages,
            },
          });
        }
      })
      .catch((err) => {
        return dispatch({
          type: foodTypeConstants.CREATE_FOOD_TYPE_FAILED,
        });
      });
  };
};

export const editFoodType = (foodType) => {
  return (dispatch, getState) => {
    dispatch({ type: foodTypeConstants.WAIT_FOR_EDIT_FOOD_TYPE });
    const state = getState();

    let token = "";

    if (state.user.auth) {
      token = state.user.auth.token;
    }

    FoodTypeServices.EditFoodType(foodType, token)
      .then((response) => {
        response = response.data;
        if (response.success) {
          return dispatch({
            type: foodTypeConstants.EDIT_FOOD_TYPE_SUCCEED,
          });
        } else {
          return dispatch({
            type: foodTypeConstants.EDIT_FOOD_TYPE_FAILED,
            payload: {
              responseMessages: response.responseMessages,
            },
          });
        }
      })
      .catch((err) => {
        return dispatch({
          type: foodTypeConstants.EDIT_FOOD_TYPE_FAILED,
        });
      });
  };
};

export const deleteFoodType = (foodTypeId) => {
  return (dispatch, getState) => {
    dispatch({ type: foodTypeConstants.WAIT_FOR_DELETE_FOOD_TYPE });
    const state = getState();

    let token = "";

    if (state.user.auth) {
      token = state.user.auth.token;
    }

    FoodTypeServices.DeleteFoodType(foodTypeId, token)
      .then((response) => {
        response = response.data;
        if (response.success) {
          return dispatch({
            type: foodTypeConstants.DELETE_FOOD_TYPE_SUCCEED,
            payload: {
              foodTypeId,
            },
          });
        } else {
          return dispatch({
            type: foodTypeConstants.DELETE_FOOD_TYPE_FAILED,
          });
        }
      })
      .catch((err) => {
        return dispatch({
          type: foodTypeConstants.DELETE_FOOD_TYPE_FAILED,
        });
      });
  };
};

export const resetAfterDeleteFoodType = () => {
  return {
    type: foodTypeConstants.RESET_AFTER_DELETE_FOOD_TYPE,
  };
};
