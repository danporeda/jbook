import { Dispatch, Middleware } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const persistMiddleware: Middleware<Dispatch<Action>> = ({ 
  dispatch,
  getState,
 }: { 
  dispatch: Dispatch<Action>;
  getState:  () => RootState
}) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: any) => {
      next(action);

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 1000);
      }
    };
  };
};