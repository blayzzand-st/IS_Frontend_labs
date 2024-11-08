const animItems = document.querySelectorAll(".benefits__section__img");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("benefits__section__img--visible");
        } else {
            entry.target.classList.remove("benefits__section__img--visible");
        }
    }))
});

animItems.forEach((item) => observer.observe(item))