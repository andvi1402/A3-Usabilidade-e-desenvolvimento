var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

    var cardTexts = [
      '<p>Rita Lee é uma figura lendária da música brasileira, conhecida por sua versatilidade e inovação. Nascida em São Paulo, em 1947, Rita começou sua carreira nos anos 60 como parte do grupo Os Mutantes, que se tornou um dos pioneiros do movimento tropicalista. Sua voz única e sua presença de palco cativaram o público, tornando-a uma das artistas mais icônicas do Brasil.<br><br>A vida pessoal de Rita Lee também foi marcada por sua autenticidade e rebeldia. Ela foi uma das primeiras artistas brasileiras a falar abertamente sobre questões como sexualidade e drogas, desafiando as normas sociais da época. Seu estilo irreverente e sua música vanguardista abriram caminho para uma nova geração de artistas.<br><br>Ao longo de sua carreira solo, que começou na década de 70, Rita lançou uma série de álbuns de sucesso, incluindo "Build Up" (1970), "Fruto Proibido" (1975) e "Rita Lee" (1980). Ela continuou a experimentar e se reinventar, explorando uma variedade de estilos musicais, do rock ao pop e ao eletrônico.<br><br>Com uma carreira que abrange décadas e um legado que transcende gêneros, Rita Lee é uma verdadeira lenda da música brasileira, uma pioneira que desafiou convenções e inspirou inúmeras gerações.</p>',
      
      '<p>Rita Lee é uma das artistas mais premiadas e reconhecidas do Brasil, tendo recebido inúmeros prêmios ao longo de sua carreira. Ela ganhou diversos Prêmios Multishow de Música Brasileira, incluindo Melhor Cantora e Melhor Álbum de Rock. Rita também foi homenageada com o Prêmio Lifetime Achievement no Latin Grammy Awards, em reconhecimento à sua contribuição duradoura para a música latina.<br><br>Além disso, sua música foi aclamada pela crítica internacional, e ela recebeu elogios de artistas renomados em todo o mundo. Os prêmios e reconhecimentos que Rita Lee recebeu ao longo dos anos são um testemunho de seu talento excepcional e de sua influência duradoura na cena musical brasileira e global.</p>',
      
      '<p>Rita Lee é uma das figuras mais proeminentes da música brasileira, com uma carreira que abrange décadas e uma variedade de estilos musicais. Sua jornada começou nos anos 60 como parte do grupo Os Mutantes, que ajudou a definir o movimento tropicalista. Desde então, ela lançou uma série de álbuns solo aclamados pela crítica, explorando uma variedade de gêneros, do rock ao pop e ao eletrônico.<br><br>Os álbuns de Rita Lee são conhecidos por sua originalidade e inovação, com letras inteligentes e melodias cativantes que capturam a essência da vida urbana brasileira. Ela é uma artista versátil, capaz de se adaptar a diferentes estilos e permanecer relevante ao longo dos anos.<br><br>Além de sua carreira musical, Rita Lee é uma autora prolífica e uma defensora dos direitos das mulheres e dos animais. Ela continua a inspirar e influenciar músicos e fãs em todo o mundo, deixando um legado que transcende gerações.</p>',
      
      '<p>Rita Lee tem uma variedade de interesses e hobbies que complementam sua carreira musical. Ela é uma entusiasta da jardinagem e passa muito tempo cultivando plantas em seu jardim. Rita também é uma ávida leitora e escritora, tendo publicado vários livros ao longo dos anos, incluindo autobiografias e romances.<br><br>Além disso, ela é uma defensora dos direitos dos animais e está envolvida em várias organizações de proteção animal. Rita dedica seu tempo e recursos para ajudar os animais em situação de risco e promover a conscientização sobre questões relacionadas ao bem-estar animal.<br><br>Os hobbies e interesses pessoais de Rita Lee refletem sua personalidade multifacetada e seu compromisso com causas que são importantes para ela. Eles complementam sua carreira musical e demonstram seu lado criativo e engajado fora dos palcos.</p>'
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