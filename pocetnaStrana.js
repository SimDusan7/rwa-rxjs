
 const nicknameInput = document.getElementById('nickname');
 const startButton = document.getElementById('startButton'); 
 const pocetni = document.getElementById('pocetna');
 const gameContainer = document.getElementById('gameContainer');
 const showResultButton = document.getElementById('showResultButton');

 nicknameInput.addEventListener('input', () => {
    startButton.disabled = nicknameInput.value === '';
 });

 startButton.addEventListener('click', () => {
     gameContainer.style.display = 'block';
     pocetni.style.display='none';

 });
