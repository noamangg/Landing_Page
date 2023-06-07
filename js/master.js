let colorsLi = document.querySelectorAll("ul.colors-list li");
let randomBG = document.querySelectorAll(".background-options > span");
let landingPage = document.querySelector(".landing-page");
let imgArr = ["/imgs/01.jpg", "/imgs/02.jpg", "/imgs/03.jpg", "/imgs/04.jpg", "/imgs/05.jpg"];
let gearIcon = document.querySelector("i.settings-gear");
let settingBox = document.querySelector(".setting-box");
let backgroundInterval;
let aboutImage = document.querySelector("#about-image");

// document.body.addEventListener("click", function(e) {
//     if(settingBox.classList.contains("opened") && ! e.target.classList.contains("settings-gear"))
//     gearIcon.click();
// })
// Settings box
gearIcon.addEventListener("click", function (e) {
    this.classList.toggle("fa-spin");
    settingBox.classList.toggle("opened");
})

// ! Colors Settings
if (localStorage.mainColor) {
    document.documentElement.style.setProperty("--main-color", localStorage.mainColor);

    colorsLi.forEach(li => {
        li.classList.remove("active");
        if (li.dataset.color === localStorage.mainColor)
            li.classList.add("active");
    })
}
else
    localStorage.mainColor = "#ffa722";
aboutImage.src = `imgs/about-icons/${(localStorage.mainColor).slice(1)}.png`;

// Colors Setting
colorsLi.forEach((li) => {
    li.addEventListener('click', (e) => {
        handelActive(e);
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.mainColor = e.target.dataset.color;
        aboutImage.src = `imgs/about-icons/${(localStorage.mainColor).slice(1)}.png`;
    })
})

// ! Random Background Option
if (localStorage.bgImageIndex) {
    landingPage.style.backgroundImage = `url(${imgArr[localStorage.bgImageIndex]})`;
}
else
    localStorage.bgImageIndex = 0;

if (localStorage.randomBackground)
    if (localStorage.randomBackground === "yes") {
        randomInterval();
    }
    else {
        randomBG.forEach((span) => {
            randomBG.forEach(span => {
                span.classList.remove("active");
            });
            if (span.dataset.background == "no")
                span.classList.add("active")

        })
    }
else
    localStorage.randomBackground = "yes";

randomBG.forEach(span => {
    span.addEventListener("click", (e) => {
        handelActive(e);
        if (span.dataset.background === "yes")
            randomInterval();
        else
            clearInterval(backgroundInterval);
        localStorage.randomBackground = span.dataset.background;
    })

})

// Select landing page element 
function randomInterval() {

    backgroundInterval = setInterval(() => {
        let rand = random(0, imgArr.length);
        landingPage.style.backgroundImage = `url(${imgArr[rand]})`;
        localStorage.bgImageIndex = rand;
    }, 5000);

}

function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

let ourSkills = document.querySelector(".skills");
window.onscroll = function (e) {
    let skillHight = ourSkills.scrollHeight;
    let topSkill = ourSkills.offsetTop;
    let windowHight = this.innerHeight;
    let scrollY = this.scrollY;

    if (scrollY > (topSkill + skillHight - windowHight)) {
        let allSkills = document.querySelectorAll(".skill-box > span");
        allSkills.forEach(span => {
            span.style.width = span.dataset.prog;
        })
    }

}


document.querySelectorAll(".images-box img").forEach(img => {
    img.addEventListener('click', function (e) {
        document.body.appendChild(createPopup(img.src));
    })
})
function createPopup(url) {
    let imagePopup = document.createElement("div");
    let myImg = document.createElement("img");
    myImg.src = url;
    imagePopup.appendChild(myImg);
    imagePopup.classList.add("images-popup");
    imagePopup.onclick = function (e) {
        imagePopup.remove();
    }
    return imagePopup;
}

let liIcons = document.querySelectorAll("ul.tooltip li");
liIcons.forEach((li) => {
    li.addEventListener("click", function (e) {
        document.querySelector(`.${li.dataset.section}`).scrollIntoView({
            behavior: "smooth"
        })
    })
})


function handelActive(e) {
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    })
    e.target.classList.add("active");

}

let bullets = document.querySelector(".tooltip");
let bulletsOption = document.querySelectorAll(".bullets-options > span");
if (localStorage.showBullets) {
    bulletsOption.forEach(span => {
        span.classList.remove("active");
    });
    bullets.style.display = localStorage.showBullets;

    if (localStorage.showBullets === "flex")
        document.querySelector(".bullets-options .yes").classList.add("active");
    else
        document.querySelector(".bullets-options .no").classList.add("active");


}
bulletsOption.forEach(span => {
    span.addEventListener('click', function (e) {
        if (span.dataset.bullets === "no") {
            bullets.style.display = "none";
            localStorage.showBullets = "none";
        }
        else {
            bullets.style.display = "flex";
            localStorage.showBullets = "flex";
        }
        handelActive(e);
    })

})

document.querySelector(".rest-options").addEventListener('click', function (e) {
    localStorage.removeItem("bgImageIndex")
    localStorage.removeItem("mainColor")
    localStorage.removeItem("randomBackground")
    localStorage.removeItem("showBullets")

    window.location.reload();
})