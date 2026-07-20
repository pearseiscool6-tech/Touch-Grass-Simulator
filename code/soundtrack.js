//Define adventuring song and other tracks in the playlist
const playlist = [
    'assets/adventuring_song.mp3.ogg',
    'assets/song1.mp3'
];

let currentAudio = null;
let currentTrackIndex = -1;

function playRandomSong() {
    const availableIndices = [];
    for (let i = 0; i < playlist.length; i++) {
        if (i !== currentTrackIndex) {
            availableIndices.push(i);
        }
    }

    // Pick a random index from the remaining options
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    currentTrackIndex = availableIndices[randomIndex];
    
    // Create and configure the audio object
    currentAudio = new Audio(playlist[currentTrackIndex]);
    currentAudio.volume = 0.1; // Optional: Adjust volume

    // CRITICAL: Listen for when the song finishes, then play the next
    currentAudio.addEventListener('ended', () => {
        playRandomSong();
    });

    // 6. Play the track
    currentAudio.play().catch(error => {
        console.log("Playback blocked. Wait for user interaction.", error);
    });
}

//start the soundtrack system on first click
function handleFirstClick() {
if (!sessionStorage.getItem('hasClickedTab')) {
    console.log("Starting soundtrack system...");
    sessionStorage.setItem('hasClickedTab', 'true');
    playRandomSong();
} else {
    console.log("Soundtrack system already started.");  
}
}
