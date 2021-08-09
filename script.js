'use strict';

const
  launchTheGame = function() {
    let
// Границы загадываемых чисел
      min = 1,
      max = 100,
// Количество попыток
      numberOfAttempts = 10,
// Генератор псевдослучайного число в заданных границах
      getRandomIntInclusive = function() {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
// Псевдослучайное число которое предстоит угадать
      hiddenNumber = getRandomIntInclusive(),
// Функция запроса ввода значений у пользователя
      enterTheNumber = function(lastTry, attemptСounter) {
        let userResponse;
        switch (true) {
          case lastTry === undefined:
            userResponse = prompt(`Угадай число от ${min} до ${max}`); break;
          case isNaN(lastTry) || (+lastTry < min || +lastTry > max):
            userResponse = prompt(`Введи число! (от ${min} до ${max})`); break;
          case lastTry < hiddenNumber: 
            userResponse = prompt(`Загаданное число больше, осталось попыток ${
              attemptСounter ? numberOfAttempts - attemptСounter : numberOfAttempts}`); break;
          case lastTry > hiddenNumber: 
            userResponse = prompt(`Загаданное число меньше, осталось попыток ${
              attemptСounter ? numberOfAttempts - attemptСounter : numberOfAttempts}`); break;
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
      guessTheNumber = function(lastTry, attemptСounter) {
        let userNumber = enterTheNumber(lastTry, attemptСounter),
//  Диалог перезапуска игры
        restartGame = function(userWon) {
          if(confirm(userWon ? 
            'Поздравляю, Вы угадали!!! Хотели бы сыграть еще?':
            'Попытки закончились, хотите сыграть еще?')) {
              hiddenNumber = getRandomIntInclusive();
              guessTheNumber();
            } else {
            alert('Благодарим за игру');
          }
        };

        if (userNumber) {
          if (hiddenNumber === +userNumber) {
            restartGame(true);
          } else {
            if (attemptСounter === numberOfAttempts - 1) {
              restartGame(false);
            } else {
              guessTheNumber(userNumber, attemptСounter ? ++attemptСounter : 1);
            }
          }
        } else {
          alert('Игра окончена');
        }
      };
    guessTheNumber();
  };

launchTheGame();