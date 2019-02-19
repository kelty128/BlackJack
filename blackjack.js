
//
//BlackJack 
//by Kelly Murphy
//

// Card Variables 
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades']
let values = ['Ace', 'King', 'Queen', 'Jack', 
              'Ten', 'Nine', 'Eight', 'Seven', 'Six', 
              'Five', 'Four', 'Three', 'Two']

// DOM Variables
let mainText = document.getElementById('main-text'),
    textArea = document.getElementById('text-area'),
    imageArea = document.getElementById('image-area'),
    scoreArea = document.getElementById('score-area'),
    textArea2 = document.getElementById('text-area-2'),
    imageArea2 = document.getElementById('image-area-2'),
    scoreArea2 = document.getElementById('score-area-2'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');

// Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];


hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

// Start a new game
newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

// Hit!
hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

// Stay
stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

// Function to build and return a new deck
function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push( card );
    }
  }
  return deck;
}

// Function to shuffle the deck
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
  return (lookup[card.value + " of " + card.suit])
}

// Lookup fancy characters for cards
var lookup = {
    "Ace of Spades" : "🂡",
    "Two of Spades" : "🂢",
    "Three of Spades" : "🂣",
    "Four of Spades" : "🂤",
    "Five of Spades" : "🂥",
    "Six of Spades" : "🂦",
    "Seven of Spades" : "🂧",
    "Eight of Spades" : "🂨",
    "Nine of Spades" : "🂩",
    "Ten of Spades" : "🂪",
    "Jack of Spades" : "🂫",
    "Queen of Spades" : "🂭",
    "King of Spades" : "🂮",
    "Ace of Hearts" : "🂱",
    "Two of Hearts" : "🂲",
    "Three of Hearts" : "🂳",
    "Four of Hearts" : "🂴",
    "Five of Hearts" : "🂵",
    "Six of Hearts" : "🂶",
    "Seven of Hearts" : "🂷",
    "Eight of Hearts" : "🂸",
    "Nine of Hearts" : "🂹",
    "Ten of Hearts" : "🂺",
    "Jack of Hearts" : "🂻",
    "Queen of Hearts" : "🂽",
    "King of Hearts" : "🂾",
    "Ace of Diamonds" : "🃁",
    "Two of Diamonds" : "🃂",
    "Three of Diamonds" : "🃃",
    "Four of Diamonds" : "🃄",
    "Five of Diamonds" : "🃅",
    "Six of Diamonds" : "🃆",
    "Seven of Diamonds" : "🃇",
    "Eight of Diamonds" : "🃈",
    "Nine of Diamonds" : "🃉",
    "Ten of Diamonds" : "🃊",
    "Jack of Diamonds" : "🃋",
    "Queen of Diamonds" : "🃍",
    "King of Diamonds" : "🃎",
    "Ace of Clubs" : "🃑",
    "Two of Clubs" : "🃒",
    "Three of Clubs" : "🃓",
    "Four of Clubs" : "🃔",
    "Five of Clubs" : "🃕",
    "Six of Clubs" : "🃖",
    "Seven of Clubs" : "🃗",
    "Eight of Clubs" : "🃘",
    "Nine of Clubs" : "🃙",
    "Ten of Clubs" : "🃚",
    "Jack of Clubs" : "🃛",
    "Queen of Clubs" : "🃝",
    "King of Clubs" : "🃞"
};

// Grab the next cart out of our deck
function getNextCard() {
  return deck.shift();
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

// Calculate the score from an array of cards
function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

// Get our dealer and player's score
function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

// Anytime anything happens we call this to see if it's the end of the game.
// If it is get ride of the hit and stay buttons and show the new game button.
function checkForEndOfGame(){
  
  updateScores();
  
  if (gameOver) {
    // let dealer take cards 
    while(dealerScore < playerScore
            && playerScore <= 21
            && dealerScore <= 21) {
        dealerCards.push(getNextCard());
        updateScores();
      }
    }
    
    if (playerScore > 21) {
      playerWon = false;
      gameOver = true;
    }
    else if (dealerScore > 21) {
      playerWon = true;
      gameOver = true;
    }
    else if (gameOver) {
      
      if (playerScore > dealerScore) {
        playerWon = true;
      }
      else {
        playerWon = false;
      }
      
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';
    }
}

// Update the UI
function showStatus() {
  if (!gameStarted) {
    
    mainText.innerText = 'Welcome to BlackJack!'
    
    textArea.style.display = 'none'
    
    imageArea.style.display = 'none' 
    
    scoreArea.style.display = 'none' 
    
    textArea2.style.display = 'none' 
   
    imageArea2.style.display = 'none'
    
    scoreArea2.style.display = 'none'
    return;
  }
  
  if (gameStarted) {
    
    mainText.style.display = 'none'
    
    textArea.style.display = 'block'
    
    imageArea.style.display = 'block' 
    
    scoreArea.style.display = 'block' 
    
    textArea2.style.display = 'block' 
   
    imageArea2.style.display = 'block'
    
    scoreArea2.style.display = 'block'
  }
  
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]);
  }
  
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]);
  }
  
  updateScores();
  
  textArea.innerText = 'Dealer has:\n' 
    
  imageArea.innerText = dealerCardString 
    
  scoreArea.innerText = '(score: ' + dealerScore + ')\n\n' 
    
  textArea2.innerText = 'Player has:\n' 
   
  imageArea2.innerText = playerCardString; 
    
  scoreArea2.innerText = '(score: ' + playerScore + ')\n\n';
    
  if (gameOver) {
    
    mainText.style.display = 'block'
    
    
    if (playerWon) {
      mainText.innerText = "YOU WIN!!!";
    }
    else {
      mainText.innerText = "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }
  
}