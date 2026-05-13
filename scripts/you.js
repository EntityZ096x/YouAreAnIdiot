function trackPopup(win) {
    const teleport = setInterval(() => {
        if (!win || win.closed) {
            clearInterval(teleport);
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
    }, 500 + Math.random() * 700); // random “teleport speed”
}