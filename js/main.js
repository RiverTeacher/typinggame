const words = [
  'fuckyou',
  'kill you',
  'You are idiot',
  'please die',
  'Do you think you have human rights?',
  'You are the bottom of humans',
  'death means sea',
  'You are god but I am garbage',
  'Do not look over here! It will get dirty!',
  'fucking player',
  'Stop this game to stay popular.',
  'You are ugly',
];
let word;
let loc;
let wordCount;
let typeMiss;
let accuracy;
let typeSpeed;
const timeLimit = 30 * 1000;
let startTime;
let startFlg = false;

const typingWord = document.getElementById('typingWord');
const wordCountLabel = document.getElementById('wordCount');
const typeMissLabel = document.getElementById('typeMiss');
const timeLeftLabel = document.getElementById('timeLeft');
const accuracyLabel = document.getElementById('accuracy');
const typeSpeedLabel = document.getElementById('typeSpeed');

function updateTypingWord() {
  let update = '';
  for (let i = 0; i < loc; i++){
    update += '🖕';
  }
  typingWord.textContent = update + word.substring(loc);
}

function updateTimeLimit() {
  const timer = startTime + timeLimit - Date.now();
  timeLeftLabel.textContent = (timer / 1000).toFixed(2);

  const timeoutId = setTimeout(() => {
    updateTimeLimit();
  }, 10);

  if (timer < 0) {
    startFlg = false;
    clearTimeout(timeoutId);
    timeLeftLabel.textContent = '0.00';
    setTimeout(() => {
      alert('時間切れ\n結果をご確認ください。');
      accuracy = wordCount + typeMiss === 0 ? 0 : wordCount / ( wordCount + typeMiss ) * 100;
      typeSpeed = wordCount / ( timeLimit / 60000 );
      accuracyLabel.textContent = accuracy.toFixed(2);
      typeSpeedLabel.textContent = typeSpeed;
    }, 100);

    typingWord.textContent = 'クリックして再挑戦';
  }
}

window.addEventListener('click', () => {
  if (startFlg === true) {
    return;
  }

  startFlg = true;
  loc = 0;
  wordCount = 0;
  typeMiss = 0;
  accuracy = 0;
  typeSpeed = 0;

  wordCountLabel.textContent = wordCount;
  typeMissLabel.textContent = typeMiss;
  accuracyLabel.textContent = accuracy;
  typeSpeedLabel.textContent = typeSpeed;
  word = words[Math.floor(Math.random() * words.length)];

  typingWord.textContent = word;
  startTime = Date.now();
  updateTimeLimit();
});

window.addEventListener('keydown', e => {
  if (startFlg === false) {
    return;
  }
  if (e.key === word[loc]){
    loc++;
    if (loc === word.length) {
      word = words[Math.floor(Math.random() * words.length)];
      loc = 0;
    }
    updateTypingWord();
    wordCount++;
    wordCountLabel.textContent = wordCount;
    // SEとバイブレーションの制御
        var good = new Audio('good.mp3');
        good.play();
  } else if (e.key === 'Shift') {
    ;
  } else {
    typeMiss++;
    typeMissLabel.textContent = typeMiss;
     // SEとバイブレーションの制御
        var warning = new Audio('warning.mp3');
        warning.play();
    }
});