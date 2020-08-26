
//&hearts;
//&hearts;
let suits = ['&hearts;', '&clubs;', '&diams;', '&spades;'];
let values = ['Ace', 'Reis', 'Rainha', 'Valete',
  '10', '9', '8', '7', '6',
  '5', '4', '3', '2',
];

let textArea = document.getElementById('text-area');
let novoJogo = document.getElementById('new-game-button');
let pedirCarta = document.getElementById('hit-button');
let pararJogar = document.getElementById('stay-button');

pedirCarta.style.display = 'none';
pararJogar.style.display = 'none';

let gameStart = false,
  gameOver = false,
  cartasDealer = [],
  cartasJogador = [],
  pontuacaoDealer = 0,
  playerScore = 0,
  deck = [];

novoJogo.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  //criar o deck
  deck = criarDeck();
  //embaralha o deck
  embaralharDeck(deck);
  //dealer e jogador começam com duas cartas
  cartasDealer = [getNextCard(), getNextCard()];
  cartasJogador = [getNextCard(), getNextCard()];

  novoJogo.style.display = 'none';
  pedirCarta.style.display = 'inline';
  pararJogar.style.display = 'inline';
  showStatus();
});

function criarDeck() {
  let deck = [];
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

function embaralharDeck(deck){
  for(let i=0; i<deck.length; i++)
  {
    let index = Math.trunc(Math.random() * deck.length);
    let tmp = deck[index];
    deck[index] = deck[i];
    deck[i] = tmp;
  }
}

pedirCarta.addEventListener('click', function(){
  cartasJogador.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

pararJogar.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function checkForEndOfGame(){
  atualizarPontuacao();
  
  //vefica se é game over para o jogador
  if(gameOver){
          // 15 < 18
    while(pontuacaoDealer<playerScore &&
          // e a pontuação do jogador é menor que 21 ele ainda n perdeu
          playerScore <=21 &&
          // e pontos dealer <= 21
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
  
  let cartasDealerString = '';
  let cont = 0;
  for(let i=0; i<cartasDealer.length; i++)
  { 
    if(gameOver) {
      cartasDealerString += '<div class="carta">' 
      + getCardString(cartasDealer[i]) 
      + '</div><br>';
    } else {
      if(cont == 0)  {
        cartasDealerString += '<div class="carta">' 
        + "<br> <label class='suit'> ? </label>" 
        + '</div><br>';
      }else {
        cartasDealerString += '<div class="carta">' 
        + getCardString(cartasDealer[i]) 
        + '</div><br>';
      }
      cont++;
    }
  }
  let cartasJogadorString='';
  for(let i=0; i<cartasJogador.length; i++)
  {
    cartasJogadorString += '<div class="carta">' 
    +getCardString(cartasJogador[i]) 
    + '</div><br>';
  }

  atualizarPontuacao();

  textArea.innerHTML = '<label class="who-and-score"> Pontuação Dealer: (score: ' + (gameOver?pontuacaoDealer:' ? ') + ')</label><br><div class="dealer">' +
                        cartasDealerString + 
                        '</div><br><br>' +

                        '<label class="who-and-score">Pontuação Jogador: (score: ' + playerScore + ')</label><br><div class="player">' +
                        cartasJogadorString + 
                        '</div><br> <label class="qtd-cartas">QTD CARTAS: '+ 
                        deck.length + '</label><br>';
                        
  if(gameOver){
    if(playerWon)
    {
      textArea.innerHTML += "<marquee scrollamount='30' class='end-game-p'>PARABÉNS VOCÊ GANHOU!</marquee>";
    }
    else{
      textArea.innerHTML += "<marquee scrollamount='30' class='end-game-d'>DEALER GANHOU!</marquee>";
    }
    novoJogo.style.display = 'inline';
    pedirCarta.style.display = 'none';
    pararJogar.style.display = 'none';
    
  }
}

function getScore(cardArray){
  let score = 0;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    //verifica se o jogador já começou com um blackjack
    if((getCardNumericValue(cardArray[0]) == 10 || getCardNumericValue(cardArray[1]) == 10) && card.value == 'Ace') {
      return 21;
    }
    score += getCardNumericValue(card);
  }
   return score; 
}

function atualizarPontuacao(){
  pontuacaoDealer = getScore(cartasDealer);
  playerScore = getScore(cartasJogador);
}


function getNextCard() {
  return deck.shift();//retorna o primeiro elemento do array removendo do deck
}