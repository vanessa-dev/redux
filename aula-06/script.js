// A função abaixo funciona perfeitamente. Mas não vamos utilizar assim, 
//por dois motivos: o primeiro é pelo fato de termos uma função que dispara 
//ações que irão modificar o estado. Por padrão, apenas ações via dispatch 
//devem modificar o estado. O segundo motivo é a necessidade de sempre passar
// o dispatch como argumento da mesma.
// https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux

const initialState = {
    loading: false,
    data: null,
    error: null
};

const { compose, applyMiddleware } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware());
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



async function fetchUrl(dispatch, url) {
    try {
        dispatch({type: "FETCH_START"});
        const data = await fetch(url).then(resposta => resposta.json());
        dispatch({type: "FETCH_SUCCESS", payload: data});
    } catch(error) {
        dispatch({type: "FETCH_ERROR", payload: error.message});
    }
};

fetchUrl(store.dispatch, "https://dogsapi.origamid.dev/json/api/photo");
