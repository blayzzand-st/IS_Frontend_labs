(function handleDomLoaded() {
    window.addEventListener('DOMContentLoaded', () => {
        getPosts()
            .then((data) => {
                const preloaderWrapper = document.querySelector(".preloader");
                const preloaderAnimation = document.querySelector(".preloader__animator");
                const guestBookTable = document.querySelector(".guest-book__table");

                const COMMENTS_NUMBER = 3;

                const idStart = 0;
                const idEnd = idStart + COMMENTS_NUMBER;

                let currentStartId = idStart;
                let currentEndId = idEnd;

                const currentComments = addCommentsToTable(data, idStart, idEnd);

                guestBookTable.classList.remove("disabled");
                preloaderWrapper.classList.add("disabled");
                preloaderAnimation.classList.add("disabled");

                hideLastCommentBorder();

                const prevBtn = document.querySelector(".control-panel__previous");
                const nextBtn = document.querySelector(".control-panel__next");

                prevBtn.classList.add("btn--disabled");
                prevBtn.disabled = true;

                prevBtn.addEventListener('click', () => {
                    currentComments.forEach((comment) => comment.remove());
                    currentComments.length = 0;

                    currentEndId = currentStartId;
                    currentStartId -= COMMENTS_NUMBER;

                    console.log(currentStartId)
                    console.log(currentEndId)

                    const newCurrentComments = addCommentsToTable(data, currentStartId, currentEndId);

                    newCurrentComments.forEach((comment) => currentComments.push(comment));

                    hideLastCommentBorder();

                    if (currentStartId <= 0) {
                        prevBtn.classList.add("btn--disabled");
                        prevBtn.disabled = true;
                    }

                    nextBtn.classList.remove("btn--disabled");
                    nextBtn.disabled = false;

                    document.querySelector(".guest-book").scrollIntoView({ behavior: "smooth" });
                });

                nextBtn.addEventListener('click', () => {
                    currentComments.forEach((comment) => comment.remove());
                    currentComments.length = 0;

                    currentStartId = currentEndId;
                    currentEndId += COMMENTS_NUMBER;

                    const newCurrentComments = addCommentsToTable(data, currentStartId, currentEndId);

                    newCurrentComments.forEach((comment) => currentComments.push(comment));

                    hideLastCommentBorder();

                    if (currentEndId >= data.length) {
                        nextBtn.classList.add("btn--disabled");
                        nextBtn.disabled = true;
                    }

                    prevBtn.classList.remove("btn--disabled");
                    prevBtn.disabled = false;

                    document.querySelector(".guest-book").scrollIntoView({ behavior: "smooth" });
                });
            })
            .catch((e) => {
                const preloaderErrorElement = document.querySelector(".preloader__error");
                const preloaderAnimator = document.querySelector(".preloader__animator");

                preloaderAnimator.classList.add("disabled");
                preloaderErrorElement.classList.remove("disabled");

                console.error(e);
            })
    })
})()

function addCommentsToTable(data, idStart, idEnd) {
    const comments = [];

    if (idStart < 0)
        idStart = 0;

    for (let i = idStart; i < idEnd && i < data.length; i++) {
        const comment = data[i];

        const title = comment.title;
        const text = comment.body;

        const commentDiv = generateComment(title, text);

        comments.push(commentDiv);
    }

    comments.forEach((comment) => document.querySelector(".guest-book__decor").after(comment))

    return comments;
}

async function getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (response.status !== 200) {
        throw new Error("Something went wrong")
    }

    return response.json()
}

function hideLastCommentBorder() {
    const comments = document.getElementsByClassName("guest-book__comment");

    const lastComment = comments[comments.length - 1];

    if (lastComment !== undefined) {
        lastComment.style.borderBottom = "none";
        lastComment.style.paddingBottom = "2.5rem";
    }
    if (comments[0] !== undefined) {
        comments[0].style.paddingTop = "2rem";
    }
}

function generateComment(title, text) {
    const commentDiv = document.createElement("div");
    const profileDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    const profileImg = document.createElement("img");
    const profileName = document.createElement("p");
    const profileNickname = document.createElement("p");
    const commentTitle = document.createElement("p");
    const commentText = document.createElement("p");
    const nameNicknameWrapper = document.createElement("div");

    profileName.classList.add("comment__profile__name");
    profileName.textContent = "Аноним";

    profileNickname.classList.add("comment__profile__nickname");
    profileNickname.textContent = "Долгожитель";

    nameNicknameWrapper.classList.add("comment__profile__name-nickname-wrapper");
    nameNicknameWrapper.append(profileName, profileNickname);

    profileImg.classList.add("comment__profile__img");
    profileImg.src = "../img/placeholder/profile_pic.svg";
    profileImg.alt = "Изображения профиля пользователя";

    profileDiv.classList.add("comment__profile");
    profileDiv.append(profileImg, nameNicknameWrapper);

    commentTitle.classList.add("comment__title");
    commentTitle.textContent = title;

    commentText.classList.add("comment__text");
    commentText.textContent = text;

    contentDiv.classList.add("comment__content");
    contentDiv.append(commentTitle, commentText);

    commentDiv.classList.add("guest-book__comment");
    commentDiv.append(profileDiv, contentDiv);

    return commentDiv;
}