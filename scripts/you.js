/* =========================
   SIMPLE 2-TAB VERSION
   Opens ONLY 2 tabs
   ONLY after a user click
   NEVER spawns more
========================= */

/* Prevent multiple activations */
let tabsOpened = false;

/* Optional audio setup */
document.addEventListener('click', musicPlay);

function musicPlay() {
    var audio = document.getElementById('youare-audio');
    var micon = document.getElementById('youare-micon');

    /* Toggle music if elements exist */
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

    /* Open tabs ONCE */
    openTwoTabs();

    /* Remove click listener so it never repeats */
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

/* Open popup window */
function openWindow(url) {

    return window.open(
        url,
        "_blank",
        "menubar=no,status=no,toolbar=no,resizable=yes,width=357,height=330"
    );
}

/* ONLY opens 2 tabs total */
function openTwoTabs() {

    /* Stop repeats */
    if (tabsOpened) return;

    tabsOpened = true;

    openWindow('lol.html');
    openWindow('lol.html');
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

        var url = "lol.html";
        var title = "Idiot!";

        window.external.AddFavorite(url, title);
    }
}

/* Disable right click (optional) */
window.oncontextmenu = function () {
    return false;
};

/* Optional keyboard prank */
window.onkeydown = function (event) {

    var keyCode = event.keyCode;

    if (
        keyCode == 17 ||
        keyCode == 18 ||
        keyCode == 46 ||
        keyCode == 115
    ) {

        alert("UwU");
    }

    return null;
};

/* Optional leave warning */
window.onbeforeunload = function () {
    return "UwU";
};

/* Startup */
window.onload = function () {

    bookmark();

    return true;
};