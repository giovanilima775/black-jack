
//&hearts;
//&hearts;
let suits = ['&hearts;', '&clubs;', '&diams;', '&spades;'];
let values = ['Ace', 'Reis', 'Rainha', 'Valete',
  '10', '9', '8', '7', '6',
  '5', '4', '3', '2', '1'
];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

hitButton.style.display = 'none';
stayButton.style.display = 'none';

let gameStart = false,
  gameOver = false,
  playWon = false,
  cartasDealer = [],
  cartasJogador = [],
  pontuacaoDealer = 0,
  playerScore = 0,
  deck = [];

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  cartasDealer = [getNextCard(), getNextCard()];
  cartasJogador = [getNextCard(), getNextCard()];
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
})

function createDeck() {
  let deck = []
  //naipe
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    //valor carta 
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      //carta com naipe
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      }
      //insere a carta dentro do baralho
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for(let i=0; i<deck.length; i++)
  {
    let swapIdx = Math.trunc(Math.random() *deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}

hitButton.addEventListener('click', function(){
  cartasJogador.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function checkForEndOfGame(){
  atualizarPontuacao();
  
  if(gameOver){
    while(pontuacaoDealer<playerScore &&
          playerScore <=21 &&
          pontuacaoDealer <=21){
            cartasDealer.push(getNextCard());
            atualizarPontuacao();
    }
  }
    
    if(playerScore>21){
      playerWon=false;
      gameOver = true;
    }
    
    else if(pontuacaoDealer>21){
      playerWon = true;
      gameOver = true;
    }
    
    else if(gameOver){
      if(playerScore>pontuacaoDealer){
        playerWon = true;
      }
      else{
        playerWon = false;
      }
    }
}

function getCardString(card) {
  return card.value + "<br> <label class='suit'>" + card.suit + "</label>";
}
function getCardNumericValue(card){
  switch(card.value){
    case 'Ace':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    default:
      return 10; 
  }
}
function showStatus()
{
  if(!gameStarted)
  {
    textArea.innerText = '';
    return; 
  }
  
  let cartasDealertring = '';
  let cont = 0;
  for(let i=0; i<cartasDealer.length; i++)
  { 
    if(gameOver) {
      cartasDealertring += '<div class="carta">' 
      + getCardString(cartasDealer[i]) 
      + '</div><br>';
    } else {
      if(cont == 0)  {
        cartasDealertring += '<div class="carta">' 
        + "<br> <label class='suit'> ? </label>" 
        + '</div><br>';
      }else {
        cartasDealertring += '<div class="carta">' 
        + getCardString(cartasDealer[i]) 
        + '</div><br>';
      }
      cont++;
    }
    
  }
  let cartasJogadortring='';
  for(let i=0; i<cartasJogador.length; i++)
  {
    cartasJogadortring += '<div class="carta">' 
    +getCardString(cartasJogador[i]) 
    + '</div><br>';
  }
  
  atualizarPontuacao();
  
  
  textArea.innerHTML = '<label> Pontuação Dealer:</label><br><div class="dealer">' +
                        cartasDealertring + 
                        '</div><br>(score: ' + (gameOver?pontuacaoDealer:' ? ') + ')<br><br>' +
                        
                        '<label>Pontuação Jogador:</label><br><div class="player">' +
                        cartasJogadortring + 
                        '</div><br>(score: ' + playerScore + ')<br><br> <label class="qtd-cartas">QTD CARTAS: '+ 
                        deck.length + '</label><br>';
                        
  if(gameOver){
    if(playerWon)
    {
      textArea.innerHTML += "<label>JOGADOR GANHOU!</label>";
    }
    else{
      textArea.innerHTML += "<label>DEALER GANHOU!</label>";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value == 'Ace'){
      hasAce = true;
    }
    
    if(hasAce && score+10<=21){
      return score+10;
    }
  }
   return score; 
}

function atualizarPontuacao(){
  pontuacaoDealer = getScore(cartasDealer);
  playerScore = getScore(cartasJogador);
}


function getNextCard() {
  return deck.shift();
}
