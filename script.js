'use strict';

const
// Границы загадываемых чисел
  min = 1,
  max = 100,      
// Генератор псевдослучайного число в заданных границах
  getRandomIntInclusive = function() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  createTheGame = function(hiddenNumber, numberOfAttempts) {
    let
// Функция запроса ввода значений у пользователя
      enterTheNumber = function(lastTry) {
        let userResponse;
        switch (true) {
          case lastTry === undefined:
            userResponse = prompt(`Угадай число от ${min} до ${max}`); break;
          case isNaN(lastTry) || (+lastTry < min || +lastTry > max):
            userResponse = prompt(`Введи число! (от ${min} до ${max})`); break;
          case lastTry < hiddenNumber: 
            userResponse = prompt(`Загаданное число больше, осталось попыток ${numberOfAttempts}`); break;
          case lastTry > hiddenNumber: 
            userResponse = prompt(`Загаданное число меньше, осталось попыток ${numberOfAttempts}`); break;
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
            return true;
          } else {
            if (numberOfAttempts === 1) {
              return false;
            } else {
              numberOfAttempts--;
              return guessTheNumber(userNumber);
            }
          }
        } else {
          return undefined;
        }
      };
    return guessTheNumber;
  };

const 
  startGame = function() {
    let newGame = createTheGame(getRandomIntInclusive (), 10),
    gameOver = newGame();
    if (gameOver === undefined) {
      alert('Игра окончена');
    } else {
      if (confirm( gameOver ? 
        'Поздравляю, Вы угадали!!! Хотели бы сыграть еще?':
        'Попытки закончились, хотите сыграть еще?')) {
          startGame();
      } else {
        alert('Благодарим за игру');
      }
    }
  };

startGame();