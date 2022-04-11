import thunkMiddleware from "redux-thunk";
import { jwt } from "./jwt";

const middlewares = [jwt, thunkMiddleware];

export default middlewares;
