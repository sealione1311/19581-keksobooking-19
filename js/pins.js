'use strict';

(function () {
  var NUMBER_ADVERTS = 5;
  var map = document.querySelector('.map');
  var pinList = document.querySelector('.map__pins');
  var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');


  var renderPin = function (object) {
    var newPin = pinTamplate.cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPin.setAttribute('style', 'left: ' + object.location.x + 'px; top: ' + object.location.y + 'px');
    newPinImg.src = object.author.avatar;
    newPinImg.alt = object.offer.title;
    var openPopup = function () {
      var popup = map.querySelector('.popup');
      var pinActive = map.querySelector('.map__pin--active');
      if (popup) {
        pinActive.classList.remove('map__pin--active');
        popup.remove();
      } else {
        window.cards.render(object);
        newPin.classList.add('map__pin--active');
      }
    };

    newPin.addEventListener('click', openPopup);
    newPin.addEventListener('keydown', function (evt) {
      if (evt.key === window.data.enter) {
        openPopup();
      }
    });
    return newPin;
  };

  var renderPins = function (advertsArr) {
    var advertsNumber = advertsArr.length > NUMBER_ADVERTS ? NUMBER_ADVERTS : advertsArr.length;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertsNumber; i++) {
      fragment.appendChild(renderPin(advertsArr[i]));
    }
    pinList.appendChild(fragment);
  };


  window.pins = {
    render: renderPins
  };
})();
