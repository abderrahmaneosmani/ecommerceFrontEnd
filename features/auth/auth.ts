import { createSelector } from "reselect";
import { RootState } from "../../app/store";
import { AuthState } from "./auth-slice";

export const authSelector: (state: RootState) => AuthState = (
  state: RootState
) => state.auth;

export const displayNameSelector = createSelector(authSelector, (auth) => {
  return auth.displayName;
});

export const emailSelector = createSelector(authSelector, (auth) => {
  return auth.email;
});

export const isUserAuthenticatedSelector = createSelector(
  authSelector,
  (auth) => {
    return auth.authenticated;
  }
);
export const errorSelector = createSelector(authSelector, (auth) => {
  return auth.error;
});
