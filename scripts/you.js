/* Prevent multiple activations */
let tabsOpened = false;
let popups = [];

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

    /* Open popups ONCE */
    openTwoTabs();

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
function openWindow(url, x, y) {
    const width = 357;
    const height = 330;

    return window.open(
        url,
        "_blank",
        `menubar=no,status=no,toolbar=no,resizable=yes,
        width=${width},height=${height},
        left=${x},top=${y}`
    );
}

/* Open 4 bouncing popups */
function openTwoTabs() {
    if (tabsOpened) return;
    tabsOpened = true;

    const width = 357;
    const height = 330;

    for (let i = 0; i < 4; i++) {

        let x = Math.random() * (screen.width - width);
        let y = Math.random() * (screen.height - height);

        let dx = (Math.random() * 6 + 3) * (Math.random() < 0.5 ? 1 : -1);
        let dy = (Math.random() * 6 + 3) * (Math.random() < 0.5 ? 1 : -1);

        let win = openWindow("lol.html", x, y);

        popups.push({
            win,
            x,
            y,
            dx,
            dy,
            width,
            height
        });
    }

    startBouncing();
}

/* DVD-style bouncing movement */
function startBouncing() {
    setInterval(() => {

        popups.forEach(p => {
            if (!p.win || p.win.closed) return;

            p.x += p.dx;
            p.y += p.dy;

            if (p.x <= 0 || p.x + p.width >= screen.width) {
                p.dx *= -1;
            }

            if (p.y <= 0 || p.y + p.height >= screen.height) {
                p.dy *= -1;
            }

            try {
                p.win.moveTo(p.x, p.y);
            } catch (e) {
                // ignored (browser restrictions)
            }
        });

    }, 20);
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

/* Removed keyboard UwU alert */
window.onkeydown = function (event) {
    var keyCode = event.keyCode;

    if (
        keyCode == 17 ||
        keyCode == 18 ||
        keyCode == 46 ||
        keyCode == 115
    ) {
        console.log("Key blocked");
    }

    return null;
};

/* Removed beforeunload warning */

/* Startup */
window.onload = function () {
    bookmark();
    return true;
};