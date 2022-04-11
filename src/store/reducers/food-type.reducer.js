import { foodTypeConstants } from "../constants";

const initialState = {
  isGettingFoodTypes: false,
  gettingFoodTypesFailed: false,
  foodTypes: [],

  isDeletingFoodType: false,
  deletingFoodTypeFailed: false,
  deletingFoodTypeSucceed: false,

  isCreatingFoodType: false,
  creatingFoodTypeFailed: false,
  creatingFoodTypeSucceed: false,
  createFoodTypeResponseMessages: [],

  isEditingFoodType: false,
  editingFoodTypeFailed: false,
  editingFoodTypeSucceed: false,
  editFoodTypeResponseMessages: [],
};

const foodTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case foodTypeConstants.WAIT_FOR_GET_FOOD_TYPES:
      return {
        ...state,
        isGettingFoodTypes: true,
        gettingFoodTypesFailed: false,
      };
    case foodTypeConstants.GET_FOOD_TYPES_FAILED:
      return {
        ...state,
        isGettingFoodTypes: false,
        gettingFoodTypesFailed: true,
      };
    case foodTypeConstants.GET_FOOD_TYPES_SUCCEED:
      return {
        ...state,
        isGettingFoodTypes: false,
        foodTypes: action.payload.foodTypes,
      };
    case foodTypeConstants.WAIT_FOR_CREATE_FOOD_TYPE:
      return {
        ...state,
        isCreatingFoodType: true,
        creatingFoodTypeFailed: false,
        creatingFoodTypeSucceed: false,
        createFoodTypeResponseMessages: [],
      };
    case foodTypeConstants.CREATE_FOOD_TYPE_FAILED:
      return {
        ...state,
        isCreatingFoodType: false,
        creatingFoodTypeFailed: true,
        createFoodTypeResponseMessages: action.payload.responseMessages,
      };
    case foodTypeConstants.CREATE_FOOD_TYPE_SUCCEED:
      return {
        ...state,
        isCreatingFoodType: false,
        creatingFoodTypeSucceed: true,
      };
    case foodTypeConstants.PREPARE_CREATE_FOOD_TYPE:
      return {
        ...state,
        isCreatingFoodType: false,
        creatingFoodTypeFailed: false,
        creatingFoodTypeSucceed: false,
        createFoodTypeResponseMessages: [],
      };

    case foodTypeConstants.WAIT_FOR_EDIT_FOOD_TYPE:
      return {
        ...state,
        isEditingFoodType: true,
        editingFoodTypeFailed: false,
        editingFoodTypeSucceed: false,
        editFoodTypeResponseMessages: [],
      };
    case foodTypeConstants.EDIT_FOOD_TYPE_FAILED:
      return {
        ...state,
        isEditingFoodType: false,
        editingFoodTypeFailed: true,
        editFoodTypeResponseMessages: action.payload.responseMessages,
      };
    case foodTypeConstants.EDIT_FOOD_TYPE_SUCCEED:
      return {
        ...state,
        isEditingFoodType: false,
        editingFoodTypeSucceed: true,
      };
    case foodTypeConstants.PREPARE_EDIT_FOOD_TYPE:
      return {
        ...state,
        isEditingFoodType: false,
        editingFoodTypeFailed: false,
        editingFoodTypeSucceed: false,
        editFoodTypeResponseMessages: [],
      };
    case foodTypeConstants.WAIT_FOR_DELETE_FOOD_TYPE:
      return {
        ...state,
        isDeletingFoodType: true,
        deletingFoodTypeFailed: false,
        deletingFoodTypeSucceed: false,
      };
    case foodTypeConstants.DELETE_FOOD_TYPE_FAILED:
      return {
        ...state,
        isDeletingFoodType: false,
        deletingFoodTypeFailed: true,
      };
    case foodTypeConstants.DELETE_FOOD_TYPE_SUCCEED:
      return {
        ...state,
        isDeletingFoodType: false,
        deletingFoodTypeSucceed: true,
        foodTypes: state.foodTypes.filter(
          (item) => item.id !== action.payload.foodTypeId
        ),
      };
    case foodTypeConstants.RESET_AFTER_DELETE_FOOD_TYPE:
      return {
        ...state,
        deletingFoodTypeSucceed: false,
      };
    default:
      return state;
  }
};

export default foodTypeReducer;
