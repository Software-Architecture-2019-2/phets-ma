import { phetsConstants } from "../constants/Types";
import { loadAuthReducer } from "../store/LocalStorage";

const initialState = loadAuthReducer();

export function setDefaultPhet(state = initialState, action) {
  switch (action.type) {
    case phetsConstants.DEFAULT_PHET_SET:
      return {
        defaultPhetSet: true,
        defaultPhet: action.animal
      };
    default:
      return state;
  }
}

export function setPhetsList(state = initialState, action) {
  switch (action.type) {
    case phetsConstants.PHETS_LIST_SET:
        return {
            phetsListSet: true,
            phets: action.animals
        };
    default:
      return state;
  }
}