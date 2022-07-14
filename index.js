const musicContainer = document.querySelector("#music-container");
const musicInfo = document.querySelector("#music-info");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const audio = document.querySelector("#audio");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const volumeprogressContainer = document.querySelector("#volumeprogress-container");
const volumeprogress = document.querySelector("#volumeprogress");
const title  = document.querySelector("#title");
const subtitle  = document.querySelector("#subtitle");
const cover  = document.querySelector("#music-cover");

const songs = [
    {
        titulo:"Bzrp music sessions 52",
        subtitulo:"Quevedo"
    },
    {
        titulo:"Bzrp music sessions 51",
        subtitulo:"Villano Antillano"
    },
    {
        titulo:"Efecto",
        subtitulo:"Bad Bunny"
    }
];

let songIndex = 0;

loadSong(songs[songIndex].titulo,songs[songIndex].subtitulo);

function loadSong(song,songSubtitle){
    title.innerText = song;
    subtitle.innerText = songSubtitle;
    audio.src = `Resources/Music/${song}.mp3`;
    cover.src = `Resources/Images/${song}.jpg`;
}

playBtn.addEventListener("click",()=>{
    const reproduciendo = musicContainer.classList.contains('play');    

    reproduciendo ? pausarCancion() : ponerCancion()
});

function ponerCancion(){
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")
    audio.play();
}

function pausarCancion(){
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fas").classList.remove("fa-pause")
    playBtn.querySelector("i.fas").classList.add("fa-play")
    audio.pause();
}


function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex].titulo,songs[songIndex].subtitulo);
    ponerCancion();
}


function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex].titulo,songs[songIndex].subtitulo);
    ponerCancion();
}

    prevBtn.addEventListener("click",prevSong);
    nextBtn.addEventListener("click",nextSong);


function updateProgress(e){
    const{duration, currentTime} = e.target;
    const progressPercent = (currentTime/ duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
audio.addEventListener("timeupdate",updateProgress);

function setProgress(e){
    //Esto devuelve el ancho de la barra de progreso
    const width = this.clientWidth;
    //Esto devuelve la posición de la barra donde estás clickeando
    const clickX = e.offsetX;
    //Esto devuelve la duración del audio que estamos escuchando
    const duration = audio.duration;

    //Con esta funcion se hacen calculos para mover la canción a la duración donde se está clickeando
    audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener("click",setProgress);



function setVolume(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.volume = (clickX / width)
    console.log(clickX)
}

function updateVolume(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const medida = (clickX / width)*100
    volumeprogress.style.width = `${medida}%`;
}

volumeprogressContainer.addEventListener('click',setVolume)
volumeprogressContainer.addEventListener("click",updateVolume);
audio.addEventListener("ended",nextSong)

function volumenDefault(){

    const medida = 22
    volumeprogress.style.width = `${medida}%`;
    audio.volume = 0.2
}

volumenDefault()




