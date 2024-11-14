(function saveUserPreferences() {
    const peopleAmount = document.querySelector("#people-amount");
    const hallLvl = document.querySelector("#hall-level");
    const bookedTime = document.querySelector("#time");
    const isAdditionalParametersIncluded = document.querySelector("#additions");
    const isFoodIncluded = document.querySelector("#food");
    const pcZone = document.querySelector("#pc");
    const consoleZone = document.querySelector("#console");
    const vrZone = document.querySelector("#vr");
    const gamePreferencesTextarea = document.querySelector("#game-preferences");

    const savedElements = [peopleAmount, hallLvl, bookedTime, isAdditionalParametersIncluded,
                                    isFoodIncluded, pcZone, consoleZone, vrZone, gamePreferencesTextarea]

    savedElements.forEach((element) => {
        element.addEventListener('change', () => {
            const value = element.type === "checkbox" ? element.checked : element.value;

            localStorage.setItem(element.id, value);
        })
    })

    window.addEventListener('DOMContentLoaded', () => {
        savedElements.forEach((element) => {
            const savedValue = localStorage.getItem(element.id);

            if (savedValue !== null) {
                if (element.type === "checkbox") {
                    element.checked = savedValue === "true";
                }
                else {
                    element.value = savedValue;
                }
            }
        })

        if (localStorage.getItem("pass_generated") === "true") {
            document.querySelector(".result").innerHTML = "";

            const peopleAmount = localStorage.getItem("people-amount") || 1;
            const hallLvl = localStorage.getItem("hall-level") || "Базовый";
            const bookedTime = localStorage.getItem("time") || "1";
            const additionalParameters = localStorage.getItem("additions") || "false";
            const pcZone = localStorage.getItem("pc") || "false";
            const consoleZone = localStorage.getItem("console") || "false";
            const vrZone = localStorage.getItem("vr") || "false";

            let foodIncluded = localStorage.getItem("food") || "false";
            let bookedZones;

            if (additionalParameters === "false") {
                bookedZones = [true, false, false];
                foodIncluded = "false";
            }
            else {
                bookedZones = [pcZone === "true", consoleZone === "true", vrZone === "true"];
            }

            generateTicket(peopleAmount, hallLvl, bookedTime, bookedZones, foodIncluded === "true");
        }
    })
})()