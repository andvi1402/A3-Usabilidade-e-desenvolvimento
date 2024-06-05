var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

    var cardTexts = [
      '<p>Tim Maia, nascido Sebastião Rodrigues Maia, é uma lenda da música brasileira, conhecido por seu talento inigualável e sua voz poderosa. Nascido no Rio de Janeiro em 1942, Tim Maia começou sua carreira musical na adolescência, cantando em corais e grupos de igreja. Ele logo se tornou uma figura proeminente na cena musical brasileira, ganhando destaque por sua voz única e sua habilidade de misturar diversos estilos musicais, como soul, funk, e música brasileira.<br><br>A vida pessoal de Tim Maia foi marcada por altos e baixos, incluindo lutas com problemas de saúde e dependência química. Apesar desses desafios, ele continuou a criar música de alta qualidade e a encantar fãs em todo o mundo. Seu legado como um dos maiores cantores da música brasileira vive até hoje, inspirando artistas e fãs em todo o mundo.</p>',
      
      '<p>Tim Maia foi amplamente reconhecido por seu talento ao longo de sua carreira, recebendo diversos prêmios e honrarias. Ele ganhou vários Prêmios Sharp, incluindo Melhor Cantor e Melhor Álbum, e foi introduzido no Hall da Fama da Música Brasileira em 2012.<br><br>Além disso, Tim Maia recebeu homenagens póstumas, incluindo uma estrela na Calçada da Fama do Rock do Rio de Janeiro. Sua música também foi aclamada internacionalmente, e ele é considerado um dos maiores ícones da música brasileira de todos os tempos.</p>',
      
      '<p>Tim Maia é uma figura lendária na música brasileira, conhecido por sua voz poderosa e sua capacidade de misturar diferentes estilos musicais. Sua carreira abrangeu décadas e incluiu uma série de sucessos, como "Azul da Cor do Mar", "Gostava Tanto de Você" e "Primavera".<br><br>Ele foi pioneiro no desenvolvimento do soul e do funk brasileiros, incorporando influências internacionais em sua música e criando um som verdadeiramente único. Sua música continua a ressoar com fãs de todas as idades, e ele é reverenciado como um dos maiores cantores da música brasileira de todos os tempos.</p>',
      
      '<p>Fora dos palcos, Tim Maia tinha uma série de interesses e hobbies que o mantinham ocupado. Ele era um ávido jogador de futebol e frequentemente organizava partidas com amigos e colegas músicos. Além disso, Tim Maia tinha uma paixão pela culinária e adorava cozinhar para seus amigos e familiares.<br><br>Ele também era conhecido por sua generosidade e senso de humor, e muitas vezes fazia piadas e brincadeiras durante suas apresentações ao vivo. Seus hobbies refletiam sua personalidade vibrante e carismática, e ajudaram a moldar sua identidade como um dos artistas mais amados e icônicos do Brasil.</p>'
    ];
    

init();

function init() {
  resize();
  selectElements();
  attachListeners();
}

function selectElements() {
  cards = document.getElementsByClassName('card'),
  nCards = cards.length,
  cover = document.getElementById('cover'),
  openContent = document.getElementById('open-content'),
  openContentText = document.getElementById('open-content-text'),
  openContentImage = document.getElementById('open-content-image')
  closeContent = document.getElementById('close-content');
}


function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
  }
  closeContent.addEventListener('click', onCloseClick);
  window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener('click', function(e) {
    var card = getCardElement(e.target);
    onCardClick(card, i);
  })
}

function onCardClick(card, i) {
  currentCard = card;
  currentCard.className += ' clicked';
  setTimeout(function() {animateCoverUp(currentCard, i)}, 500);
  animateOtherCards(currentCard, true);
  openContent.className += ' open';
}


function animateCoverUp(card, i) {
  var cardPosition = card.getBoundingClientRect();
  var cardStyle = getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);
  openContentText.innerHTML = '<h1>' + card.children[2].textContent + '</h1>' + cardTexts[i];
  
  openContentImage.src = card.children[1].src;
  setTimeout(function() {
    window.scroll(0, 0);
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  cover.style.transform = 'scaleX(' + 1 + ') scaleY(' + 1 + ') translate3d(' + (0) + 'px, ' + (0) + 'px, 0px)';
  setTimeout(function() {
    openContentText.innerHTML = '';
    openContentImage.src = '';
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    currentCard.className = currentCard.className.replace(' clicked', '');
  }, 301);
}

function setCoverPosition(cardPosition) {
  cover.style.left = cardPosition.left + 'px';
  cover.style.top = cardPosition.top + 'px';
  cover.style.width = cardPosition.width + 'px';
  cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  cover.style.transform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ') translate3d(' + (offsetX) + 'px, ' + (offsetY) + 'px, 0px)';
}

function onCloseClick() {
  openContent.className = openContent.className.replace(' open', '');
  animateCoverBack(currentCard);
  animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

function animateOutCard(card, delay) {
  setTimeout(function() {
    card.className += ' out';
   }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function() {
    card.className = card.className.replace(' out', '');
  }, delay);
}


function getCardElement(el) {
  if (el.className.indexOf('card ') > -1) return el;
  else return getCardElement(el.parentElement);
}

function resize() {
  if (pageIsOpen) {
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

document.getElementById('back-to-home').addEventListener('click', function() {
  window.location.href = 'index.html';
});