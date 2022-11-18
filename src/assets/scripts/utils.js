function createElem(tag, id, innerText, ...classNames) {
  const elem = document.createElement(tag);
  if (id) {
    elem.id = id;
  }
  if (innerText) {
    elem.innerText = innerText;
  }
  if (classNames?.length > 0) {
    classNames.forEach((className) => {
      elem.classList.add(className);
    });
  }
  return elem;
}

function clearContentsOfElemWithId(...ids) {
  ids.forEach((id) => {
    const elem = document.getElementById(id);
    elem.innerHTML = '';
  });
}

module.exports = {
  createElem,
  clearContentsOfElemWithId,
};
