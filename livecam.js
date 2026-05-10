function updateTimestamp() {
    const now = new Date();
    const timeString = now.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
    });

    const ts = document.getElementById('timestamp');
    if (ts) ts.textContent = timeString;
}

const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const directBase = 'http://103.245.39.218:8080/808gps';
const proxiedBase = '/808gps';
const cameraBase = isLocalHost ? directBase : proxiedBase;

const camUrls = {
    cam1: `${cameraBase}/open/player/video.html?lang=en&devIdno=290320207005&account=PWS&password=PWS1234&channel=1&chns=0&isWxApp=1`,
    cam2: `${cameraBase}/open/player/video.html?lang=en&devIdno=290320207005&account=PWS&password=PWS1234&channel=1&chns=1&isWxApp=1`
};

function initCamFrames() {
    const cam1 = document.getElementById('cam1');
    const cam2 = document.getElementById('cam2');

    if (cam1) cam1.src = camUrls.cam1;
    if (cam2) cam2.src = camUrls.cam2;
}

function reloadCam(id) {
    const frame = document.getElementById(id);
    if (!frame || !camUrls[id]) return;

    frame.src = 'about:blank';
    setTimeout(() => {
        frame.src = camUrls[id];
    }, 200);
}

function bindReloadButtons() {
    document.querySelectorAll('[data-cam-id]').forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-cam-id');
            if (id) reloadCam(id);
        });
    });
}

updateTimestamp();
setInterval(updateTimestamp, 1000);
bindReloadButtons();
initCamFrames();

console.log('Sparing Cam Monitoring System Started');
console.log('Camera 1: Ready');
console.log('Camera 2: Ready');
