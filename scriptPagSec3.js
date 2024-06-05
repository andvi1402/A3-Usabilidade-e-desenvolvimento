var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

    var cardTexts = [
      '<p>Charlie Brown Jr. (CBJR) é uma banda icônica formada em Santos, São Paulo, em 1992. A história do grupo é marcada pelas personalidades fortes de seus integrantes, especialmente Chorão (Alexandre Magno Abrão) e Champignon (Luiz Carlos Leão Duarte Júnior). Chorão, conhecido por sua paixão pelo skate e sua atitude rebelde, se tornou uma figura carismática e influente na música brasileira. Ele era o principal letrista da banda, escrevendo sobre temas como amor, rebeldia, e as dificuldades da vida urbana, o que ressoou profundamente com os jovens.<br><br>A vida dos membros da banda, especialmente de Chorão, foi marcada por altos e baixos. Chorão era conhecido por sua sinceridade e intensidade, tanto na música quanto em sua vida pessoal. Seu relacionamento tumultuado com os outros membros da banda e suas lutas pessoais, incluindo o abuso de substâncias, foram amplamente divulgados. Apesar desses desafios, ele sempre conseguiu canalizar suas experiências em músicas que tocavam o coração de milhões de fãs.<br><br>A tragédia atingiu a banda em 2013, quando Chorão foi encontrado morto em seu apartamento, uma perda devastadora para a música brasileira. Poucos meses depois, Champignon também faleceu, deixando uma lacuna irreparável na banda e no coração dos fãs. A vida de Charlie Brown Jr. é uma mistura de sucesso estrondoso e perda trágica, mas o legado emocional e cultural que deixaram continua a influenciar e inspirar novas gerações.</p>',
      
      '<p>Charlie Brown Jr. conquistou inúmeros prêmios ao longo de sua carreira, refletindo o impacto profundo da banda na música brasileira. Eles receberam diversos Prêmios Multishow de Música Brasileira, incluindo o de Melhor Banda, e o prêmio de Melhor Álbum de Rock no VMB da MTV por álbuns como "100% Charlie Brown Jr. - Abalando a Sua Fábrica".<br><br>Além disso, a banda ganhou discos de ouro e platina por suas vendas, demonstrando o sucesso comercial de suas músicas. Os prêmios e reconhecimentos recebidos ao longo dos anos são um testemunho da popularidade e influência duradoura de Charlie Brown Jr. no cenário musical brasileiro.</p>',
      
      '<p>Charlie Brown Jr. revolucionou o cenário do rock brasileiro com sua fusão inovadora de punk rock, reggae, rap e skate punk. Fundada em 1992, a banda lançou seu álbum de estreia, "Transpiração Contínua Prolongada", em 1997, apresentando sucessos como "Proibida Pra Mim" e "Tudo Que Ela Gosta de Escutar". Este álbum rapidamente catapultou a banda ao estrelato, graças à sua sonoridade única e letras que refletiam a vida urbana e a juventude brasileira.<br><br>O sucesso continuou com álbuns como "Preço Curto... Prazo Longo" (1999) e "Nadando com os Tubarões" (2000), consolidando CBJR no cenário musical nacional. A banda era conhecida por suas apresentações ao vivo enérgicas e pela conexão profunda com seu público. Hits como "Zóio de Lula", "Te Levar Daqui" e "Só os Loucos Sabem" tornaram-se hinos para os fãs, destacando a habilidade da banda em combinar diferentes estilos musicais com letras impactantes.<br><br>Apesar das mudanças na formação e dos conflitos internos, CBJR sempre conseguiu se reinventar e manter sua essência. A carreira da banda foi marcada por uma série de sucessos, incluindo álbuns como "100% Charlie Brown Jr. - Abalando a Sua Fábrica" (2001), "Bocas Ordinárias" (2002), e "Tamo Aí na Atividade" (2004). Cada lançamento reafirmava a relevância e a inovação da banda no rock nacional.<br><br>A morte de Chorão e Champignon em 2013 marcou o fim de uma era, mas o impacto de Charlie Brown Jr. na música brasileira permanece inegável. A banda deixou um legado duradouro, influenciando inúmeras outras e mantendo viva a chama do rock brasileiro. Charlie Brown Jr. não foi apenas uma banda; foi um movimento cultural que capturou a voz de uma geração e continua a inspirar novos músicos e fãs.</p>',
      
      '<p>Fora dos palcos, os membros de Charlie Brown Jr. tinham vários hobbies que influenciavam suas vidas e músicas. Chorão, o vocalista, era um apaixonado por skate e frequentemente incluía referências ao esporte em suas letras. Ele até abriu uma pista de skate em Santos, a Chorão Skate Park, que se tornou um ponto de encontro para skatistas de todo o Brasil.<br><br>Champignon, por outro lado, era um entusiasta de videogames e passava horas jogando em seu tempo livre. Essas paixões pessoais dos integrantes da banda ajudaram a moldar a identidade de Charlie Brown Jr. e a fortalecer a conexão com seus fãs, que compartilhavam dos mesmos interesses.</p>'
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