var lastTipOn = localStorage.getItem('last-tip-on') || '',
    lastTipTitle = localStorage.getItem('last-tip-title') || '',
    lastTipDescription = localStorage.getItem('last-tip-description') || '',
    lastTipNumber = localStorage.getItem('last-tip-number') || 1,
    xhr,
    html = document.createElement('span');

var URL_TO_READ_FROM = 'https://raw.githubusercontent.com/alexpop89/es6-tips/master/README.md';
function _setHtmlData() {
    try {
        document.getElementById('title').innerText = lastTipTitle;
        document.getElementById('description').innerText = lastTipDescription;
    } catch (ignore) {}
}

function _gotInitialPageSuccess() {
    var from,
        to,
        tip,
        tipNumber = '##' + lastTipNumber,
        nextTipNumber = '##' + (lastTipNumber + 1);

    if (xhr.readyState == 4) {
        html.innerHTML = xhr.responseText;

        from = xhr.responseText.indexOf(tipNumber);

        if (from === -1) {
            lastTipNumber = 1;
            tipNumber = '##1';
            nextTipNumber = '##2';
            from = xhr.responseText.indexOf(tipNumber);
        }

        to = xhr.responseText.indexOf(nextTipNumber);
        to = to === -1 ? xhr.responseText.length : to;

        tip = xhr.responseText.substring(from, to).replace(tipNumber + '.', '').replace(tipNumber, '').trim();
        lastTipOn = new Date().getDate();
        lastTipTitle = tip.substring(0, tip.indexOf('.'));
        lastTipDescription = tip.substring(0, tip.length);
        lastTipNumber = parseInt(lastTipNumber, 10) + 1;

        _setHtmlData();
        _setLocalStorageData();
        _showNotification();
    }
}

function _makeXhrRequest(url, callback) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = callback;
    xhr.open("GET", url, true);
    xhr.send();
}

function _alreadyHadTipToday() {
    return (new Date().getDate() === parseInt(lastTipOn, 10)) && lastTipTitle && lastTipDescription;
}

function _showNotification() {
    new Notification(lastTipTitle, {icon: './images/icon.png', body: lastTipDescription}).onclick = function () {
        window.open('https://github.com/alexpop89/es6-tips/blob/master/README.md', '_blank');
    };
}

function _setLocalStorageData() {
    localStorage.setItem('last-tip-on', lastTipOn);
    localStorage.setItem('last-tip-title', lastTipTitle);
    localStorage.setItem('last-tip-description', lastTipDescription);
    localStorage.setItem('last-tip-number', lastTipNumber);
}

function _noop() {}

function checkNotificationPermission() {
    Notification.permission !== "granted" ? Notification.requestPermission() : _noop();
}

function getTip() {
    _alreadyHadTipToday() ? _setHtmlData() : _makeXhrRequest(URL_TO_READ_FROM, _gotInitialPageSuccess);
}

(function () {
    checkNotificationPermission();
    getTip();
    setInterval(getTip, 5000);
    document.addEventListener("DOMContentLoaded", getTip);
}());