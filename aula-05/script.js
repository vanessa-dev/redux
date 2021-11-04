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
    return next(action)
}

const middleware = Redux.applyMiddleware(logger);
const store = Redux.createStore(reducer, middleware);
