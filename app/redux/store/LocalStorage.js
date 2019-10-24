const loadAuthReducer = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState).state;
  }
  catch (err) {
    return {};
  }
};

const removeState = () => {
  try {
    localStorage.removeItem('state');
  }
  catch (err) {

  }
};

const saveState = (state) => {
  try {
    if (JSON.parse(localStorage.getItem('state'))) {
      removeState();
    }
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }
  catch (err) {
    return undefined;
  }
};

const clearLocalStorage = () => {
  localStorage.clear();
};

export { loadAuthReducer, saveState, clearLocalStorage };