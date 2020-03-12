'use strict';
(function () {
  var main = document.querySelector('main');

  var showSuccessMessage = function () {
    var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);


    var removeSuccessMessage = function () {
      successMessage.remove();
      document.removeEventListener('keydown', onSuccessMessageEscPress);
      document.removeEventListener('click', onSuccessMessageClick);
    };

    var onSuccessMessageEscPress = function (evt) {
      if (evt.key === window.data.escape) {
        removeSuccessMessage();
      }
    };
    var onSuccessMessageClick = function () {
      removeSuccessMessage();
    };

    main.appendChild(successMessage);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);
  };

  var showErrorMessage= function (errorText) {
    var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var text = errorMessage.querySelector('.error__message');

    var errorButton = errorMessage.querySelector('.error__button');
    var removeErrorMessage = function () {
      errorMessage.remove();
      document.removeEventListener('keydown', onErrorMessageEscPress);
      document.removeEventListener('click', onErrorMessageClick);
    };

    var onErrorMessageEscPress = function (evt) {
      if (evt.key === window.data.escape) {
        removeErrorMessage();
      }
    };
    var onErrorMessageClick = function () {
      removeErrorMessage();
    };
    text.textContent = errorText;
    main.appendChild(errorMessage);
    errorButton.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('mousedown', onErrorMessageClick);
  };
  window.messages = {
    success: showSuccessMessage,
    error: showErrorMessage
  }
})();
