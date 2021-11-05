//Currying
const li = Array.from(document.querySelector("li"));

const getElementAttr = (key) => {
    return function (el) {
        return el.getAttribute(key);
    }
}

const getAttrDataSlide = getElementAttr("data-slide");
const getAttrId = getElementAttr("id");

const dataSlideList = li.map(getAttrDataSlide);
const idList = li.map(getAttrId);

//Middleware

function reducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENTAR':
            return state + 1;
        case 'REDUZIR':
            return state - 1;
        default:
            return state;
    }
}

const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.group("ACTION", action);
    console.group("PREV_STATE", store.getState());
    const result = next(action);
    console.group("NEW_STATE", store.getState());
    console.groupEnd();
    return result;
}

const { applyMiddleware, compose} = Redux;
const composeEnhace = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhacer = composeEnhace(applyMiddleware(logger));
const store = Redux.createStore(reducer, middleware);

store.dispatch({ type: "INCREMENTAR"});
store.dispatch({ type: "INCREMENTAR"});