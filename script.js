'use strict';

const
  createTheGame = function(min, max, numberOfAttempts) {
    let
// Генератор псевдослучайного число в заданных границах
      getRandomIntInclusive = function() {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      hiddenNumber = getRandomIntInclusive(),
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
  startGame = function(min, max, attempts) {
    let newGame = createTheGame(min, max, attempts),
    gameOver = newGame();
    if (gameOver === undefined) {
      alert('Игра окончена');
    } else {
      if (confirm( gameOver ? 
        'Поздравляю, Вы угадали!!! Хотели бы сыграть еще?':
        'Попытки закончились, хотите сыграть еще?')) {
          startGame(min, max, attempts);
      } else {
        alert('Благодарим за игру');
      }
    }
  };

startGame(1, 100, 10);