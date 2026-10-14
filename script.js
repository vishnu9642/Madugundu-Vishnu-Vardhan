/* ========================================
   LOADER
======================================== */

const loader = document.querySelector(".loader");
const loaderNumber = document.querySelector(".loader-number");
const loaderProgress = document.querySelector(".loader-progress");

let progress = 0;

const loaderInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 3;

    if (progress >= 100) {
        progress = 100;

        clearInterval(loaderInterval);

        setTimeout(() => {
            if (loader) {
                loader.classList.add("hide");
            }
        }, 350);
    }

    if (loaderNumber) {
        loaderNumber.textContent = progress;
    }

    if (loaderProgress) {
        loaderProgress.style.width = `${progress}%`;
    }

}, 70);


/* ========================================
   CUSTOM CURSOR
======================================== */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;


/*
   Custom cursor is mainly for desktop.
   It is disabled on touch devices through CSS.
*/

if (cursor && cursorRing) {

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    document
        .querySelectorAll(
            "a, button, .project-card, .skill-item"
        )
        .forEach((element) => {

            element.addEventListener("mouseenter", () => {

                cursorRing.classList.add("hover");

            });


            element.addEventListener("mouseleave", () => {

                cursorRing.classList.remove("hover");

            });

        });

}


/* ========================================
   MOBILE MENU
======================================== */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

const mobileLinks = document.querySelectorAll(
    ".mobile-menu a"
);


function closeMobileMenu() {

    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.remove("open");

    menuButton.classList.remove("active");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open menu"
    );

    document.body.classList.remove("menu-open");

}


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        menuButton.classList.toggle(
            "active",
            isOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close menu"
                : "Open menu"
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });

}


/*
   If the user changes from mobile width
   to desktop width, automatically close
   the mobile menu.
*/

window.addEventListener("resize", () => {

    if (window.innerWidth >= 768) {

        closeMobileMenu();

    }

});


/* ========================================
   SCROLL PROGRESS
======================================== */

const scrollProgress =
    document.querySelector(".scroll-progress");


function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${percentage}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


/* ========================================
   REVEAL ON SCROLL
======================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    /*
       Fallback for older browsers
    */

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* ========================================
   HERO PARALLAX
======================================== */

const heroPhoto =
    document.querySelector(".hero-photo");


/*
   Parallax is only used on desktop.
   This prevents unwanted movement on phones.
*/

function updateHeroParallax() {

    if (!heroPhoto) return;

    if (window.innerWidth <= 767) {

        heroPhoto.style.transform = "";

        return;

    }

    const scrollY = window.scrollY;

    if (scrollY < window.innerHeight) {

        heroPhoto.style.transform =
            `translateY(${scrollY * 0.08}px)`;

    } else {

        heroPhoto.style.transform =
            "translateY(0)";

    }

}


window.addEventListener(
    "scroll",
    updateHeroParallax,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateHeroParallax
);


/* ========================================
   MAGNETIC HERO BUTTON
======================================== */

const magneticButton =
    document.querySelector(".magnetic");


/*
   Magnetic effect only works on desktop.
   Touch devices do not need this effect.
*/

if (magneticButton) {

    magneticButton.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 767) return;

            const rect =
                magneticButton.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            magneticButton.style.transform =
                `translate(
                    ${x * 0.12}px,
                    ${y * 0.12}px
                )`;

        }
    );


    magneticButton.addEventListener(
        "mouseleave",
        () => {

            magneticButton.style.transform =
                "translate(0, 0)";

        }
    );

}


/* ========================================
   IMAGE ERROR HANDLING
======================================== */

document
    .querySelectorAll("img")
    .forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    `Image could not be loaded: ${image.src}`
                );

            }

        );

    });


/* ========================================
   ABOUT PHOTO TRANSITION
======================================== */

const aboutPhotos =
    document.querySelectorAll(".about-photo");

let currentPhoto = 0;


if (aboutPhotos.length > 1) {

    /*
       Make sure the first image is active
    */

    aboutPhotos.forEach((photo, index) => {

        photo.classList.toggle(
            "active",
            index === 0
        );

    });


    setInterval(() => {

        aboutPhotos[
            currentPhoto
        ].classList.remove("active");


        currentPhoto =
            (currentPhoto + 1) %
            aboutPhotos.length;


        aboutPhotos[
            currentPhoto
        ].classList.add("active");

    }, 4000);

}