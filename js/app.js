const togglerIcon = document.getElementById('modal-toggler')
const tracklistModal = document.getElementById('playlist-modal')
const closeModal = document.querySelector('.now-playing-close')
const playBtn = document.getElementById('play-song')
const audio = document.querySelector('#audio')
const songTitle = document.getElementById('song-title')
const artistName = document.getElementById('artiste-name')
const featuredArtiste = document.getElementById('song-feature')
let songIndex = 0
const fastForwardBtn = document.getElementById('fast-forward')
const rewindBtn = document.getElementById('rewind-btn')
let progressBar = document.getElementById('progress-bar')
const progressContainer = document.querySelector('.progress-container')
const shuffleBtn = document.getElementById('random-song')
const repeatBtn = document.getElementById('repeat-all')
const playlistTrack = document.querySelector('.playlist-song')
const trackTitle = document.querySelector('.track-title')
const trackArtiste = document.querySelector('.track-artiste')
const trackList = document.getElementById('tracklist')
const nowPlayingTrackTitle = document.getElementById('now-playing-title')
const nowPlayingTrackArtiste = document.getElementById('now-playing-artiste')
const timeNow = document.getElementById('time-now')
const timeLeft = document.getElementById('time-left')


const songs = [
    {
        name: 'Reckless',
        artiste: 'Wizkid',
        feature: ''
    },
    
    {
        name: 'Ginger',
        artiste: 'Wizkid, Burna Boy',
        feature: '(Feat. Burna Boy)'
    },
    
    {
        name: 'Longtime',
        artiste: 'Wizkid, Skepta',
        feature: '(Feat. Skepta)'
    },
    
    {
        name: 'Mighty Wine',
        artiste: 'Wizkid',
        feature: ' '
    },
    
    {
        name: 'Blessed',
        artiste: 'Wizkd, Damian Marley',
        feature: '(Feat. Damian Marley)'
    },
    
    {
        name: 'Smile',
        artiste: 'Wizkid, H.E.R.',
        feature: '(Feat. H.E.R.)'
    },
    
    {
        name: 'Piece of Me',
        artiste: 'Wizkid, Ella Mai',
        feature: '(Feat. Ella Mai)'
    },
    
    {
        name: 'No Stress',
        artiste: 'Wizkid',
        feature: ''
    },
    
    {
        name: 'True Love',
        artiste: 'Wizkid, Projexx, Tay Iwar',
        feature: '(Feat. Tay Iwar & Projexx)'
    },
    
    {
        name: 'Sweet One',
        artiste: 'Wizkid',
        feature: ' '
    },
    
    {
        name: 'Essence',
        artiste: 'Wizkid, Tems',
        feature: '(Feat. Tems)'
    },
    
    {
        name: 'Gyrate',
        artiste: 'Wizkid',
        feature: ''
    },
    
    {
        name: 'Grace',
        artiste: 'Wizkid',
        feature: ''
    },
    
    
]



// render tracklist modal tracks
renderTracks()
function renderTracks() {
    let content = ''

    for (let i = 0; i < songs.length; i++) {
        
         content += `<div class="playlist-song">
         <diV>
                <p class="track-title">${songs[i].name}</p>
                <span>${songs[i].feature}</span>
        </div>
                <p class="track-artiste">${songs[i].artiste}</p>
                    </div>`
    }
    
    trackList.innerHTML = content
}

// play from playlist

trackList.addEventListener('click', (e)=>{
    if (e.target.classList.contains('track-title')) {
        
        let ai = songs.filter((song)=>{
            if (song.name.includes(e.target.textContent)) {
                return song
            }
        })
        
        
        songIndex = songs.indexOf(ai[0])
        loadSong()
        audio.play()

        audio.classList.remove('paused')
        audio.classList.add('playing')

        playBtn.classList.remove('fa-play-circle')
        playBtn.classList.add('fa-pause-circle')
    }
})

// fast forward

fastForwardBtn.addEventListener('click', (e)=>{
    
    if (audio.classList.contains('paused')) {
        
        if (songIndex === songs.length - 1) {
            songIndex = 0
        }

        else{songIndex++}

        loadSong()
        progressBar.style.width = 0
    }
    
    else if (audio.classList.contains('playing')) {
        if (songIndex === songs.length - 1) {
            songIndex = 0
        }
        
        else{songIndex++}
        
        
        loadSong()
        audio.play()
    }
    e.preventDefault()
})

// rewind

rewindBtn.addEventListener('click', (e)=>{

    if (audio.classList.contains('paused')) {

        if (songIndex === 0) {
            songIndex = songs.length - 1
        }

        else{songIndex--}

        progressBar.style.width = 0
        loadSong()
    }

    else if (audio.classList.contains('playing')) {
        if (songIndex === 0) {
            songIndex = songs.length - 1
        }

        else{songIndex--}

        loadSong()
        audio.play()
    }
    
    e.preventDefault()
})

// update progess

audio.addEventListener('timeupdate', ()=>{
    
    let currentSongTime = audio.currentTime
    let audioDuration = audio.duration
    
    let progressPercent = (currentSongTime/audioDuration) * 100

    progressBar.style.width = `${progressPercent}%`
    
        timeNow.textContent = (currentSongTime/60).toFixed(2)
        timeLeft.textContent = ((audio.currentTime - audio.duration)/60).toFixed(2)  

        if (timeLeft.textContent === 'NaN') {
            timeLeft.textContent = '--:--'
            timeNow.textContent = '--:--'
        }
        else{
            timeLeft.textContent = timeLeft.textContent
            timeNow.textContent = timeNow.textContent
        }


})



// progress change by click

progressContainer.addEventListener('click', (e)=>{
    
    let clickX = e.offsetX
    const barWidth = progressContainer.clientWidth 

    audio.currentTime = (clickX/barWidth) * audio.duration



})


// shuffle

shuffleBtn.addEventListener('click', ()=>{
    if (shuffleBtn.classList.contains('shuffle-active')) {
        shuffleBtn.classList.remove('shuffle-active')
    }
    else{shuffleBtn.classList.add('shuffle-active')}
})


// load song

function loadSong() {
    audio.src = `./music/${songs[songIndex].name}.mp3`
    songTitle.textContent = `${songs[songIndex].name}`
    artistName.textContent = songs[songIndex].artiste
    featuredArtiste.textContent = songs[songIndex].feature

    nowPlayingTrackTitle.textContent = `${songs[songIndex].name} ${songs[songIndex].feature}`
    nowPlayingTrackArtiste.textContent = songs[songIndex].artiste
}

loadSong()

// play or pause song
playBtn.addEventListener('click', (e)=>{


    if (audio.classList.contains('playing')) {
        audio.classList.remove('playing')
        audio.classList.add('paused')

        playBtn.classList.remove('fa-pause-circle')
        playBtn.classList.add('fa-play-circle')
        
        audio.pause()
    }
    else if (audio.classList.contains('paused')) {
        audio.classList.remove('paused')
        audio.classList.add('playing')

        playBtn.classList.remove('fa-play-circle')
        playBtn.classList.add('fa-pause-circle')
        

        audio.play()
    }

    
    e.preventDefault()
})

// next song if ended

audio.addEventListener('ended', ()=>{


    if (shuffleBtn.classList.contains('shuffle-active')&&(!repeatBtn.classList.contains('repeat-active')||!repeatBtn.classList.contains('fa-repeat-1'))) {
        songIndex = Math.floor(Math.random()*13)

        loadSong()
        audio.play()
    }

    else if (repeatBtn.classList.contains('fa-repeat-1')) {
        let ab = songs.filter((song)=>{
            if (song.name.includes(songTitle.textContent)) {
                return song
            }
        })

        songIndex = songs.indexOf(ab[0])

        loadSong()
        audio.play()
    }

    else if(!repeatBtn.classList.contains('fa-repeat-1')&&!repeatBtn.classList.contains('repeat-active')&&songIndex === songs.length -1){
        audio.pause()
        audio.currentTime = 0
        playBtn.classList.remove('fa-pause-circle')
        playBtn.classList.add('fa-play-circle')
        audio.classList.remove('playing')
        audio.classList.add('paused')
        
    }

    else if (songIndex === songs.length - 1 && repeatBtn.classList.contains('repeat-active') && repeatBtn.classList.contains('fa-repeat-alt') ) {
        songIndex = 0
        
        loadSong()
        audio.play()
   
    }

    else{
        songIndex++
        loadSong()
        audio.play()
       
    }


})



// repeat song functionality
repeatBtn.addEventListener('click',()=>{
   if (!repeatBtn.classList.contains('repeat-active')&&repeatBtn.classList.contains('fa-repeat-alt')) {
    repeatBtn.classList.add('repeat-active')
    } 
   else if (repeatBtn.classList.contains('repeat-active')&&repeatBtn.classList.contains('fa-repeat-alt')) {
       repeatBtn.classList.remove('fa-repeat-alt')
       repeatBtn.classList.add('fa-repeat-1')
    }

    else if (repeatBtn.classList.contains('repeat-active')&&repeatBtn.classList.contains('fa-repeat-1')) {
        repeatBtn.classList.remove('fa-repeat-1')
        repeatBtn.classList.add('fa-repeat-alt')
        repeatBtn.classList.remove('repeat-active')
    }

})

   

// modal toggler functionality
togglerIcon.addEventListener('click', (e)=>{
    tracklistModal.style.display = 'block'
    setTimeout(()=>{tracklistModal.style.opacity = 1}, 10)
    
    e.preventDefault()
})

closeModal.addEventListener('click', (e)=>{
    tracklistModal.style.opacity = 0
    setTimeout(()=>{tracklistModal.style.display = 'none'}, 210)
    e.preventDefault()
})









