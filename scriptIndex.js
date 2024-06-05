document.addEventListener('DOMContentLoaded', function () {
    const botaoMais = document.querySelector('.botao-mais');
    const modal = document.getElementById('modal');
    const fecharModal = document.querySelector('.fechar-modal');

    botaoMais.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    fecharModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

let player;
let currentVideoIndex = 0;
const videos = [
    {
        id: 'xawFL5EYdgY',
        title: 'CBJr. - Vem ser Minha',
        cover: 'https://www.youtube.com/watch?v=pKYy9hDxiEw'
    },
    {
        id: 'pmY-TIOjQJ4',
        title: 'Elis Regina - Como Nossos Pais',
        cover: 'https://www.youtube.com/watch?v=pmY-TIOjQJ4'
    }

];
let isPlaying = false;
let timer;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videos[currentVideoIndex].id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    updateMusicInfo();
}

function onPlayerReady(event) {
    updateDuration();
    playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        nextVideo();
    } else if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        document.getElementById('play-pause').textContent = '⏸️';
        startTimer();
    } else {
        isPlaying = false;
        document.getElementById('play-pause').textContent = '▶️';
        stopTimer();
    }
}

function playVideo() {
    player.playVideo();
    isPlaying = true;
    document.getElementById('play-pause').textContent = '⏸️';
}

function pauseVideo() {
    player.pauseVideo();
    isPlaying = false;
    document.getElementById('play-pause').textContent = '▶️';
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    player.loadVideoById(videos[currentVideoIndex].id);
    updateMusicInfo();
}

function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    player.loadVideoById(videos[currentVideoIndex].id);
    updateMusicInfo();
}

function updateMusicInfo() {
    document.getElementById('title').textContent = videos[currentVideoIndex].title;
    document.getElementById('cover').src = videos[currentVideoIndex].cover;
    document.getElementById('time').textContent = '00:00';
    document.getElementById('progress').style.width = '0%';
    updateDuration();
}

function updateDuration() {
    const duration = player.getDuration();
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    document.getElementById('duration').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('next').addEventListener('click', nextVideo);
document.getElementById('prev').addEventListener('click', prevVideo);
document.getElementById('play-pause').addEventListener('click', function () {
    if (isPlaying) {
        pauseVideo();
    } else {
        playVideo();
    }
});

function startTimer() {
    timer = setInterval(() => {
        const currentTime = player.getCurrentTime();
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        document.getElementById('time').textContent =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        const progress = (currentTime / player.getDuration()) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function redirecionarParaPagina2() {
    window.open("paginaSec1.html", "_blank");
}

function redirecionarParaPagina3() {
    window.open("paginaSec2.html", "_blank");
}

function redirecionarParaPagina4() {
    window.open("paginaSec3.html", "_blank");
}
