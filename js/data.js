'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_KEY_MOUSE = 1;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomArray = function (array) {
    var randomArray = array.slice(0, getRandomNumber(1, array.length));
    return randomArray.sort(function () {
      return 0.5 - Math.random();
    });
  };
  var toggleDisabledElements = function (elements, value) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = value;
    }
  };

  var createElement = function (tag, parentClass, elementClass) {
    var elementNew = document.createElement(tag);
    var parent = document.querySelector(parentClass);
    elementNew.classList.add(elementClass);
    parent.append(elementNew);
    return elementNew;
  };

  window.data = {
    enter: ENTER_KEY,
    leftKeyMouse: LEFT_KEY_MOUSE,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray,
    toggleDisabledElements: toggleDisabledElements,
    createElement: createElement
  };
})();
