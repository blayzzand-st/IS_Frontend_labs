function generateTicket(peopleAmount, hallLevelVar, durationNumberVar,
                        bookedZones, isFoodIncluded) {
    const [resultDiv] = document.getElementsByClassName("result");

    resultDiv.append(
        generateOrderTime(),
        generateHeader(),
        generatePeopleAmountElement(peopleAmount),
        generateHallLvlElement(hallLevelVar),
        generateDurationElement(durationNumberVar),
        generateBookedZonesElement(bookedZones),
        generateFoodIncludedElement(isFoodIncluded),
        generateMap(bookedZones),
        generateFooter(peopleAmount, hallLevelVar, durationNumberVar)
    );

    resultDiv.style.display = "block";
}

function generateOrderTime() {
    const orderTime = document.createElement("p");

    const now = new Date();

    orderTime.classList.add("result__time");
    orderTime.textContent =
        `${now.getHours()}:${now.getMinutes().toString().length === 1 ? "0" + now.getMinutes() : now.getMinutes()}`;

    return orderTime;
}

function generateHeader() {
    const resultHeaderDiv = document.createElement("div");
    const resultTitle = document.createElement("h1");
    const resultSubtitle = document.createElement("p");

    resultHeaderDiv.classList.add("result__header");

    resultTitle.classList.add("result__title");
    resultTitle.textContent = "GG Place"

    resultSubtitle.classList.add("result__subtitle");
    resultSubtitle.textContent = "pass";

    resultHeaderDiv.appendChild(resultTitle);
    resultHeaderDiv.appendChild(resultSubtitle);

    return resultHeaderDiv;
}

function generatePeopleAmountElement(peopleAmountVar) {
    const resultPeopleAmountDiv = document.createElement("div");
    const peopleAmountDescription = document.createElement("p");
    const peopleAmountNumber = document.createElement("p");

    resultPeopleAmountDiv.classList.add("result__people-amount");
    peopleAmountDescription.classList.add("result__description");
    peopleAmountNumber.classList.add("result__number");

    peopleAmountDescription.textContent = "Количество человек:";
    peopleAmountNumber.textContent = peopleAmountVar;

    resultPeopleAmountDiv.appendChild(peopleAmountDescription);
    resultPeopleAmountDiv.appendChild(peopleAmountNumber);

    return resultPeopleAmountDiv;
}

function generateHallLvlElement(hallLevelVar) {
    const resultHallLevelDiv = document.createElement("div");
    const hallLevelDescription = document.createElement("p");
    const hallLevel = document.createElement("p");

    resultHallLevelDiv.classList.add("result__hall-lvl");
    hallLevelDescription.classList.add("result__description");
    hallLevel.classList.add("result__number");

    hallLevelDescription.textContent = "Уровень зала:";
    hallLevel.textContent = hallLevelVar;

    resultHallLevelDiv.appendChild(hallLevelDescription);
    resultHallLevelDiv.appendChild(hallLevel);

    return resultHallLevelDiv;
}

function generateDurationElement(durationNumberVar) {
    const resultDurationDiv = document.createElement("div");
    const durationDescription = document.createElement("p");
    const durationNumber = document.createElement("p");

    resultDurationDiv.classList.add("result__duration");
    durationDescription.classList.add("result__description");
    durationNumber.classList.add("result__number");

    durationDescription.textContent = "Забронированное время:";
    durationNumber.textContent = `${durationNumberVar} ${getHoursLabel(durationNumberVar)}`;

    resultDurationDiv.append(durationDescription, durationNumber);

    return resultDurationDiv;
}

function getHoursLabel(hours) {
    switch (hours) {
        case "1":
            return "час";
        case "2":
        case "3":
        case "4":
            return "часа";
        default:
            return "часов";
    }
}

function generateBookedZonesElement(bookedZones) {
    const resultZonesDiv = document.createElement("div");
    const resultZonesDescription = document.createElement("p");
    const resultZonesWrapperDiv = document.createElement("div");
    const pcZone = document.createElement("p");
    const consoleZone = document.createElement("p");
    const vrZone = document.createElement("p");

    pcZone.textContent = bookedZones[0] === true ? "✅ ПК зал" : "❌ ПК зал";
    consoleZone.textContent = bookedZones[1] === true ? "✅ Консольный зал" : "❌ Консольный зал";
    vrZone.textContent = bookedZones[2] === true ? "✅ VR Арена" : "❌ VR Арена";

    resultZonesWrapperDiv.classList.add("result__zones__wrapper");
    resultZonesWrapperDiv.append(pcZone, consoleZone, vrZone);

    resultZonesDescription.classList.add("result__zones__desc");
    resultZonesDescription.textContent = "Зоны";

    resultZonesDiv.classList.add("result__zones");
    resultZonesDiv.append(resultZonesDescription, resultZonesWrapperDiv);

    return resultZonesDiv;
}

function generateFoodIncludedElement(isFoodIncluded) {
    const foodIncluded = document.createElement("p");

    foodIncluded.classList.add("result__food");
    foodIncluded.textContent = isFoodIncluded ? "+ питание" : "";

    return foodIncluded;
}

function generateMap(bookedZones) {
    const resultMapDiv = document.createElement("div");
    const resultMapTitle = document.createElement("p");
    const resultMapDescription = document.createElement("p");
    const resultMapImg = document.createElement("img");

    resultMapTitle.classList.add("result__map__title");
    resultMapTitle.textContent = "Карта GG Place";

    resultMapDescription.classList.add("result__map__desc");
    resultMapDescription.textContent = "(выделенные зоны для вас)";

    const [isPcZoneIncluded, isConsoleZoneIncluded, isVrZoneIncluded] = bookedZones;
    const zoneMap = {
        '100': "../img/maps/pc.svg",
        '010': "../img/maps/console.svg",
        '001': "../img/maps/vr.svg",
        '101': "../img/maps/pcVr.svg",
        '110': "../img/maps/pcConsole.svg",
        '011': "../img/maps/consoleVr.svg",
        '111': "../img/maps/all.svg"
    }

    const key = `${+isPcZoneIncluded}${+isConsoleZoneIncluded}${+isVrZoneIncluded}`;

    resultMapImg.src = zoneMap[key];
    resultMapImg.id = "result__map__img";
    resultMapImg.alt = "Карта GG Place с отмеченными зонами";

    resultMapDiv.classList.add("result__map");
    resultMapDiv.append(resultMapTitle, resultMapDescription, resultMapImg);

    return resultMapDiv;
}

function generateFooter(peopleAmount, hallLvl, bookedTime) {
    const resultFooterDiv = document.createElement("div");
    const resultLogo = document.createElement("img");
    const resultPriceDiv = document.createElement("div");
    const resultPriceNumber = document.createElement("p");

    resultPriceNumber.textContent = `Итого: ${getPrice(peopleAmount, hallLvl, bookedTime)} ₽`;

    resultPriceDiv.classList.add("result__price");
    resultPriceDiv.appendChild(resultPriceNumber);

    resultLogo.src = "../img/branding/logo_ver2.svg";
    resultLogo.alt = "GG Place";
    resultLogo.classList.add("result__footer__logo");

    resultFooterDiv.classList.add("result__footer");
    resultFooterDiv.append(resultLogo, resultPriceDiv);

    return resultFooterDiv;
}

function getPrice(peopleAmount, hallLvl, bookedTime) {
    const prices = {
        'базовый': 100,
        'продвинутый': 200,
        'vip': 300
    }

    return prices[hallLvl.toLowerCase()] * +bookedTime * peopleAmount;
}

function interceptSubmit() {
    const constructorForm = document.getElementById("form");
    const result = document.querySelector(".result");

    const peopleAmount = document.querySelector("#people-amount");
    const hallLvl = document.querySelector("#hall-level");
    const bookedTime = document.querySelector("#time");
    const isAdditionalParametersIncluded = document.querySelector("#additions");
    const isFoodIncluded = document.querySelector("#food");

    constructorForm.addEventListener('submit', function (event) {
        event.preventDefault();

        result.innerHTML = "";

        let bookedZones;
        let foodBooked;

        if (isAdditionalParametersIncluded.checked) {
            bookedZones = [
                document.querySelector("#pc").checked,
                document.querySelector("#console").checked,
                document.querySelector("#vr").checked
            ]

            foodBooked = isFoodIncluded.checked;
        } else {
            bookedZones = [true, false, false];
            foodBooked = false;
        }

        generateTicket(peopleAmount.value, hallLvl.value, bookedTime.value, bookedZones, foodBooked);

        localStorage.setItem("pass_generated", "true");
    })
}

(function checkForAdditionalParameters() {
    const additionalParametersCheckbox = document.getElementById("additions");

    const [bookedZonesFieldset] = document.getElementsByClassName("form__gaming-zones");
    const [formFoodDiv] = document.getElementsByClassName("form__food");
    const [formFoodInput] = formFoodDiv.getElementsByClassName("form__input");
    const [gamePreferencesDiv] = document.getElementsByClassName("form__game-preferences");
    const [gamePreferencesTextarea] = gamePreferencesDiv.getElementsByClassName("form__textarea");
    const formPreferencesDescription = document.getElementById("game-preferences__desc");

    if (localStorage.getItem("additions") === "true") {

        bookedZonesFieldset.classList.remove("disabled");
        bookedZonesFieldset.disabled = false;

        formFoodDiv.classList.remove("disabled");
        formFoodInput.disabled = false;

        gamePreferencesDiv.classList.remove("disabled");
        gamePreferencesTextarea.disabled = false;

        formPreferencesDescription.classList.remove("disabled");
    }

    additionalParametersCheckbox.addEventListener('change', () => {
        if (additionalParametersCheckbox.checked) {

            bookedZonesFieldset.classList.remove("disabled");
            bookedZonesFieldset.disabled = false;

            formFoodDiv.classList.remove("disabled");
            formFoodInput.disabled = false;

            gamePreferencesDiv.classList.remove("disabled");
            gamePreferencesTextarea.disabled = false;

            formPreferencesDescription.classList.remove("disabled");
        }
        else {

            bookedZonesFieldset.classList.add("disabled");
            bookedZonesFieldset.disabled = true;

            formFoodDiv.classList.add("disabled");
            formFoodInput.disabled = true;

            gamePreferencesDiv.classList.add("disabled");
            gamePreferencesTextarea.disabled = true;

            formPreferencesDescription.classList.add("disabled");
        }
    })
})()

interceptSubmit()