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
