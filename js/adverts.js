'use strict';

(function () {
  var MIN_WIDTH = 0;
  var MAX_WIDTH = 1150;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var PIN_WIDTH = 65;
  var PIN_HEIGTH = 88;
  var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var NUMBER_ADVERTS = 8;
  var pinList = document.querySelector('.map__pins');
  var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var generateAdvert = function (idx) {
    return {
      author: {
        avatar: 'img/avatars/user0' + (idx + 1) + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: '600, 350',
        price: 2000,
        type: window.data.getRandomElement(HOUSING_TYPE),
        rooms: 2,
        guests: 4,
        checkin: window.data.getRandomElement(CHECKIN),
        checkout: window.data.getRandomElement(CHECKOUT),
        features: window.data.getRandomArray(FEATURES),
        description: 'строка с описанием',
        photos: window.data.getRandomElement(PHOTOS),
      },
      location: {
        x: window.data.getRandomNumber(MIN_WIDTH, MAX_WIDTH - PIN_WIDTH / 2),
        y: window.data.getRandomNumber(MIN_Y, MAX_Y - PIN_HEIGTH)
      }
    };
  };

  var generateAdverts = function (count) {
    var adverts = [];
    for (var i = 0; i < count; i++) {
      adverts.push(generateAdvert(i));
    }
    return adverts;
  };

  var renderPin = function (object) {
    var newPin = pinTamplate.cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPin.setAttribute('style', 'left: ' + (object.location.x + PIN_WIDTH / 2) + 'px; top: ' + (object.location.y + PIN_HEIGTH) + 'px');
    newPinImg.src = object.author.avatar;
    newPinImg.alt = object.offer.title;
    return newPin;
  };

  var renderPins = function (advertsArr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertsArr.length; i++) {
      fragment.appendChild(renderPin(advertsArr[i]));
    }
    return fragment;
  };

  var renderPinsAndAppend = function () {
    pinList.appendChild(renderPins(generateAdverts(NUMBER_ADVERTS)));
  };

  window.adverts = {
    renderPinsAndAppend: renderPinsAndAppend
  };
})();
