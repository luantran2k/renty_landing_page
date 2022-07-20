// Nav active
const navEl = document.querySelector("header div:first-child");
const navLinks = document.querySelectorAll(".nav-link");
const navMenuBtn = document.querySelector(".nav-menu-btn");
navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
        document
            .querySelectorAll(".nav-link.active")
            .forEach((navLink) => navLink.classList.remove("active"));
        navLink.classList.add("active");
        navEl.classList.remove("open");
    });
});
navMenuBtn.addEventListener("click", () => {
    navEl.classList.add("open");
});

//Booking horizontal scroll
const headerBookingContainer = document.querySelector(".header-booking");
const horizontalScroll = function (
    container,
    callback = () => {
        console.log("default");
    }
) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    container.addEventListener("mouseleave", () => {
        isDown = false;
    });
    container.addEventListener("mouseup", () => {
        isDown = false;
    });
    container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        container.scrollLeft = scrollLeft - walk;
    });
    container.addEventListener("scroll", callback);
};
horizontalScroll(headerBookingContainer);

// Popular control
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".previous-btn");
const popularCards = document.querySelectorAll(".popular-card");
const popularCardsContainer = document.querySelector(".popular-cards");

const nextFuction = () => {
    let idCardActive = [...popularCards].findIndex((popularCard) =>
        popularCard.classList.contains("active")
    );
    let cardSize = popularCards[0].offsetWidth + 30; // 30 is size of gap
    popularCardsContainer.scroll({
        left: cardSize * (idCardActive + 1),
        behavior: "smooth",
    });
    if (idCardActive < popularCards.length - 1) {
        popularCards[idCardActive].classList.remove("active");
        popularCards[idCardActive + 1].classList.add("active");
    }
    console.log(idCardActive);
};

const previousFunction = () => {
    let idCardActive = [...popularCards].findIndex((popularCard) =>
        popularCard.classList.contains("active")
    );
    let cardSize = popularCards[0].offsetWidth + 30; // 30 is size of gap
    popularCardsContainer.scroll({
        left: cardSize * idCardActive - cardSize,
        behavior: "smooth",
    });
    if (idCardActive > 0) {
        popularCards[idCardActive].classList.remove("active");
        popularCards[idCardActive - 1].classList.add("active");
    }
    console.log(idCardActive);
};

let oldScrollLeft = popularCardsContainer.scrollLeft;
let deltalScrollLeft = 0;
let deltalScrollRight = 0;

popularCardsContainer.addEventListener("scroll", (e) => {
    e.preventDefault();
    let currentScrollLeft = e.currentTarget.scrollLeft;
    if (currentScrollLeft > oldScrollLeft) {
        deltalScrollLeft = 0;
        deltalScrollRight += currentScrollLeft - oldScrollLeft;
        oldScrollLeft = currentScrollLeft;
        if (deltalScrollRight >= popularCards[0].offsetWidth) {
            deltalScrollRight = 0;
            console.log("right");
            let idCardActive = [...popularCards].findIndex((popularCard) =>
                popularCard.classList.contains("active")
            );
            if (idCardActive < popularCards.length) {
                popularCards[idCardActive].classList.remove("active");
                popularCards[idCardActive + 1].classList.add("active");
            }
        }
    } else {
        deltalScrollRight = 0;
        deltalScrollLeft += oldScrollLeft - currentScrollLeft;
        oldScrollLeft = currentScrollLeft;
        if (deltalScrollLeft >= popularCards[0].offsetWidth) {
            deltalScrollLeft = 0;
            console.log("left");
            let idCardActive = [...popularCards].findIndex((popularCard) =>
                popularCard.classList.contains("active")
            );
            if (idCardActive > 0) {
                popularCards[idCardActive].classList.remove("active");
                popularCards[idCardActive - 1].classList.add("active");
            }
        }
    }
});

nextBtn.addEventListener("click", nextFuction);

previousBtn.addEventListener("click", previousFunction);

// FAQ control
const askHeaders = document.querySelectorAll(".ask-header");

askHeaders.forEach((askHeader) =>
    askHeader.addEventListener("click", () => {
        console.log(askHeader.parentElement.classList.toggle("open"));
    })
);

// Hover social list
const socialList = document.querySelectorAll(".social-list a");

socialList.forEach((item) => {
    item.addEventListener("mouseover", () => {
        item.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
        item.classList.remove("hover");
    });
});
