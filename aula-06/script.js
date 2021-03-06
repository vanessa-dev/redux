// A função abaixo funciona perfeitamente. Mas não vamos utilizar assim, 
//por dois motivos: o primeiro é pelo fato de termos uma função que dispara 
//ações que irão modificar o estado. Por padrão, apenas ações via dispatch 
//devem modificar o estado. O segundo motivo é a necessidade de sempre passar
// o dispatch como argumento da mesma.
// https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux

function getLocalStorage(key, initial) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch(error) {
    return initial
  }
}
const initialState = {
    loading: false,
    data: getLocalStorage('data', null),
    error: null
};

const thunk = (store) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(store.dispatch, store.getState);
    } else {
      return next(action);
    }
};

const localStorage = (store) => (next) => (action) => {
  const result = next(action);
  if (action.localStorage !== undefined) {
    window.localStorage.setItem(action.localStorage, JSON.stringify(action.payload))
  }
  return result;
}

const { compose, applyMiddleware } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));
const store = Redux.createStore(reducer, enhancer);

function reducer (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_START':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {data: action.payload, loading: false, error: false};
        case 'FETCH_ERROR':
            return {data:null, loading: false, error: true}
    }
}



function fetchUrl(url) {
    return async (dispatch) => {
      try {
        dispatch({ type: 'FETCH_STARTED' });
        const data = await fetch(url).then((r) => r.json());
        dispatch({ type: 'FETCH_SUCCESS', payload: data, localStorage: 'data' });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
}

const state = store.getState();
if (state.data == null) {
  store.dispatch(fetchUrl('https://dogsapi.origamid.dev/json/api/photo'));
}

