import { refreshToken } from "../actions";
import moment from "moment";

export function jwt({ dispatch, getState }) {
  return (next) => (action) => {
    // only worry about expiring token for async actions
    if (typeof action === "function") {
      var auth = getState().user.auth;

      if (auth && auth.token) {
        //when it expires
        var tokenExpiration = auth.expiration;

        if (
          tokenExpiration &&
          moment(tokenExpiration) - moment(Date.now()) < 5000
        ) {
          // make sure we are not already refreshing the token
          if (!getState().user.waitForRefreshToken) {
            return refreshToken(dispatch, auth.token, auth.refreshToken).then(
              () => next(action)
            );
          } else {
            return auth.freshTokenPromise.then(() => next(action));
          }
        }
      }
    }
    return next(action);
  };
}
