'use strict';

const
// Границы загадываемых чисел
  min = 1,
  max = 100,
// Генератор псевдослучайного число в заданных границах
  getRandomIntInclusive = function() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  launchTheGame = function(hiddenNumber) {
    const
// Функция запроса ввода значений у пользователя
      enterTheNumber = function(lastTry) {
        let userResponse;
        switch (true) {
          case lastTry === undefined:
            userResponse = prompt(`Угадай число от ${min} до ${max}`); break;
          case isNaN(lastTry) || (+lastTry < min || +lastTry > max):
            userResponse = prompt(`Введи число! (от ${min} до ${max})`); break;
          case lastTry < hiddenNumber: 
            userResponse = prompt('Загаданное число больше'); break;
          case lastTry > hiddenNumber: 
            userResponse = prompt('Загаданное число меньше'); break;
        }
        switch (true) {
          case userResponse === null:
            return false;
          case isNaN(userResponse) || (+userResponse < 1 || +userResponse > 100): 
            return enterTheNumber(userResponse);
          default:
            return userResponse;
        } 
      },
//  Функция хода в игре
      guessTheNumber = function(lastTry) {
        let userNumber = enterTheNumber(lastTry);

        if (userNumber) {
          if (hiddenNumber === +userNumber) {
            alert('Поздравляю, Вы угадали!!!');
          } else {
            guessTheNumber(userNumber);
          }
        } else {
          alert('Игра окончена');
        }
      };
    return guessTheNumber;
  };

const newGame = launchTheGame(getRandomIntInclusive());
newGame();