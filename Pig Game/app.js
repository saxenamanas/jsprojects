/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0,0];
var roundScore = 0;
var activePlayer = 0;
//document.querySelector('#current-' + activePlayer).textContent = dice;
document.querySelector('.dice').style.display = 'none';


document.querySelector('#current-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;
document.querySelector('#score-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;

function switc(){
  document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
  document.querySelector('.player-'+((activePlayer+1)%2)+'-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    var dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    if(dice == '1')
      {
        //document.querySelector('#score-'+activePlayer).textContent = document.querySelector('#current-'+activePlayer).textContent;
        document.querySelector('#current-'+activePlayer).textContent = 0;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        switc();
        activePlayer = (activePlayer+1)%2;
        roundScore = 0;
      }
    else {
    roundScore = roundScore + dice;
    document.querySelector('#current-'+ activePlayer).textContent = dice;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
     document.querySelector('#current-'+ activePlayer).textContent = roundScore;
    }
});

document.querySelector('.btn-new').addEventListener('click', function () {
  document.querySelector('#name-'+activePlayer).textContent = 'Player '+(activePlayer+1);
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  if(activePlayer == 1)
    {
      switc();
    }
  activePlayer = 0;
});

document.querySelector('.btn-hold').addEventListener('click', function()
{
  //var temp = document.querySelector('#current-' + activePlayer).textContent;
  var maxScore = document.querySelector('.score-max').value;
  console.log(maxScore);
  scores[activePlayer]= scores[activePlayer] + roundScore;
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
  document.querySelector('#current-'+activePlayer).textContent = 0;
  if(scores[activePlayer]>=maxScore)
    {
        document.querySelector('#name-'+activePlayer).textContent = 'WINNER';
        document.querySelector('.btn-roll').style.display = 'none';
        //document.querySelector('#name-'+activePlayer).classList.add('winner');
    }
    else {
  switc();
  activePlayer = (activePlayer+1)%2;
  roundScore = 0;
}
});
