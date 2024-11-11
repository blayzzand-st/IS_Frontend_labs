(function () {
    window.addEventListener('load', () => {
        setTimeout(() => {
            addActiveClassToMenuItem();

            const [timing] = performance.getEntriesByType("navigation");
            const timeForLoad = timing.loadEventEnd - timing.startTime;

            const [loadTimeText] = document.getElementsByClassName("footer__load-time");
            const timeForLoadFormatted = timeForLoad.toFixed(0);
            const millisecondsLabel = getMillisecondsLabel(timeForLoadFormatted);

            loadTimeText.innerHTML = `Страница загружена за ${timeForLoadFormatted} ${millisecondsLabel}`;
        }, 0);
    })
})()

function getMillisecondsLabel(number) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `миллисекунд`;
    }

    switch (lastDigit) {
        case 1:
            return `миллисекунда`;
        case 2:
        case 3:
        case 4:
            return `миллисекунды`;
        default:
            return `миллисекунд`;
    }
}

function addActiveClassToMenuItem() {
    const pageUrl = document.URL;
    const [mainPage, aboutPage, orderPage, contactsPage] =
        document.getElementsByClassName("nav__link");

    const currentPageName = pageUrl.split("/")[6];
    let currentPageLink;

    switch (currentPageName) {
        case "index.html":
            currentPageLink = mainPage;
            break;
        case "about.html":
            currentPageLink = aboutPage;
            break;
        case "order.html":
            currentPageLink = orderPage;
            break;
        case "contacts.html":
            currentPageLink = contactsPage;
            break;
    }

    currentPageLink.classList.add("nav__link--active");
}