import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares";
import { loadState, saveState } from "../utils/LocalStorage";
import lodash from "lodash";

export default function configureStore() {
  const persistedState = loadState();

  const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(...middlewares)
  );

  store.subscribe(
    lodash.throttle(() => {
      saveState({
        user: { ...store.getState().user },
      });
    }, 1000)
  );

  return store;
}
