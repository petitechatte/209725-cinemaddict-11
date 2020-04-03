"use strict";

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(template, place);
};
