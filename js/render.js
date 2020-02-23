'use strict';

(function () {
  var NUMBER_ADVERTS = 5;
  var pinList = document.querySelector('.map__pins');
  var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (object) {
    var newPin = pinTamplate.cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPin.setAttribute('style', 'left: ' + object.location.x + 'px; top: ' + object.location.y + 'px');
    newPinImg.src = object.author.avatar;
    newPinImg.alt = object.offer.title;
    return newPin;
  };

  var renderPins = function (advertsArr) {
    var advertsNumber = advertsArr.length > NUMBER_ADVERTS ? NUMBER_ADVERTS : advertsArr.length;
    pinList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertsNumber; i++) {
      fragment.appendChild(renderPin(advertsArr[i]));
    }
    pinList.appendChild(fragment);
  };

  window.render = {
    pins: renderPins
  }
})();
