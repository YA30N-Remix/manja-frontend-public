import API from "../utils/API";

class FoodTypeServices {
  GetFoodTypes = (token) => {
    let config = {
      url: "FoodType",
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    };

    return API(config);
  };

  CreateFoodType = (foodType, token) => {
    let config = {
      url: `FoodType`,
      method: "post",
      data: foodType,
      headers: { Authorization: `Bearer ${token}` },
    };
    return API(config);
  };

  DeleteFoodType = (foodTypeId, token) => {
    let config = {
      url: `FoodType/${foodTypeId}`,
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    };

    return API(config);
  };

  GetFoodType = (foodTypeId, token) => {
    let config = {
      url: `FoodType/${foodTypeId}`,
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    };

    return API(config);
  };

  EditFoodType = (foodType, token) => {
    let config = {
      url: `FoodType`,
      method: "put",
      data: foodType,
      headers: { Authorization: `Bearer ${token}` },
    };
    return API(config);
  };
}

export default new FoodTypeServices();
