import { phetsConstants } from "../constants/Types";

function setDefaultPhet(animal) {
    return dispatch => {
      
        dispatch(success(animal));
    };
  
    function success(animal) {
      return { type: phetsConstants.DEFAULT_PHET_SET, animal };
    }
}

function deleteDefaultPhet() {
    return dispatch => {
      
        dispatch(success());
    };
  
    function success() {
      return { type: phetsConstants.DEFAULT_PHET_SET, animal: {} };
    }
}

function setPhetsList(animals) {
    return dispatch => {
        dispatch(success(animals));
    };
  
    function success(animals) {
      return { type: phetsConstants.PHETS_LIST_SET, animals };
    }
}

function deletePhetsList() {
    return dispatch => {
        dispatch(success());
    };
  
    function success() {
      return { type: phetsConstants.PHETS_LIST_SET, animals: {} };
    }
}

export const phetsActions = {
    setDefaultPhet,
    deleteDefaultPhet,
    setPhetsList,
    deletePhetsList
};