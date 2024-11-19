(function addPromoCode() {
   const linkDiv = document.getElementById("promo-code");

    linkDiv.addEventListener('click', () => {

        // Подключаем вызов toaster из UI библиотеки toastify-js
        // text: текст уведомления
        // gravity: выравнивание по вертикали (top or bottom)
        // position: выравнивание по горизонтали
        // stopOnFocus: предотвратить исчезновение при наведении пользователем на уведомление
        // onClick: callback функция

        Toastify({
            text: "Ваш промокод на получение скидки 20% \n MATRIX20",
            duration: 2000,
            gravity: "bottom",
            position: "right",
            className: "toaster",
            stopOnFocus: true,
            onClick: function(){
                navigator.clipboard.writeText("MATRIX20")
                    .then(() => {

                        Toastify({
                            text: "Текст скопирован в буфер обмена",
                            duration: 1000,
                            gravity: "bottom",
                            position: "right",
                            className: "toaster--notification",
                        }).showToast();
                    })
                    .catch((e) => console.error(e))
            }
        }).showToast();
    }, { once: true })
})()