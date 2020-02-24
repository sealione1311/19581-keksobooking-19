'use strict';

(function () {

  var advertsData = [];
  var housingType = document.querySelector('#housing-type');

  var onError = function (errorMassage) {
    var spanError = window.data.createElement('span', '.promo');
    spanError.style = 'z-index: 100; margin: 0 auto; text-align: center; color: red;';
    spanError.textContent = errorMassage;
    spanError.style.position = 'absolute';
    spanError.style.left = 0;
    spanError.style.right = 0;
    spanError.style.fontSize = '20px';
  };

  var filterAdverts = function () {
    if (housingType.value === 'any') {
      window.render.pins(advertsData);
    } else {
      var filteredAdverts = advertsData.filter(function (advert) {
        return advert.offer.type === housingType.value;
      });
      window.render.pins(filteredAdverts);
    }
  };

  var onLoad = function (data) {
    advertsData = data;
    filterAdverts();
    window.cards.render(data)
  };

  housingType.addEventListener('change', filterAdverts);
  window.adverts = {
    onLoad: onLoad,
    onError: onError
  };
})();
