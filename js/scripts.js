const randomButton = document.querySelector("#random-button")

const logo = document.querySelector("#logo")
const rings = document.querySelectorAll(".ring")
const clock1 = document.querySelector("#clock-right")
const clock2 = document.querySelector("#clock-left")
const alien = document.querySelector("#alien")
const clockBackground = document.querySelector(".clock-background")
const info = document.querySelector("#info")
const headerBackground = document.querySelector("#header-background")
const alienInformation = document.querySelector("#info-content")
const linkedinButton = document.querySelector("#linkedin")
const githubButton = document.querySelector("#github")
const refreshButton = document.querySelector("#refresh")

const alienList = [
    "benmummy", "blitzwolfer", "cannonbolt", "diamondhead", "ditto", "eyeguy",
    "fourarms", "frankenstrike", "ghostfreak", "ghostfreak2", "greymatter",
    "heatblast", "ripjaws", "stinkfly", "upchuck", "upgrade", "waybig", "wildmut",
    "wildvine", "xlr8"
]

function randomAlien(list) {
    const randomNumber = Math.floor(Math.random() * list.length)
    return list[randomNumber]
}

function showAlien(list) {
    return new Promise((resolve, reject) => {
        let counter = 0;
        const interval = setInterval(() => {
            const alienName = randomAlien(list);
            fixAlienPosition(alienName);
            alien.src = `assets/aliens/${alienName}.png`
            
            toggleClasses();
            counter++;
            if (counter === 7) {
                clearInterval(interval)
                resolve(alienName)
            }
        }, 500)
    })
}

function toggleClasses() {
    clock1.classList.toggle("active")
    clock2.classList.toggle("active")
    alien.classList.toggle("active")
}

function desactivateClasses() {
    clock1.classList.remove("active")
    clock2.classList.remove("active")
    alien.classList.remove("active")
}

function displayNone() {
    return new Promise((resolve, reject) => {
        const hideList = [logo, clock1, clock2, randomButton]

        hideList.forEach((e) => {
            e.classList.add("hide")
        })

        rings.forEach((e) => {
            e.classList.add("hide")
        })
        resolve()
    })
}

function fixAlienPosition(string) {
    alien.style.maxWidth = ""
    alien.style.marginTop = ""
    alien.style.marginLeft = ""

    switch(string) {
        case "benmummy":
            alien.style.maxWidth = "45px"
            alien.style.marginTop = "-10px"
        break
        case "blitzwolfer":
            alien.style.maxWidth = "60px"
            alien.style.marginTop = "-10px"
        break
        case "cannonbolt":
            alien.style.maxWidth = "80px"
        break
        case "diamondhead":
            alien.style.maxWidth = "55px"
            alien.style.marginTop = "-5px"
        break
        case "ditto":
            alien.style.maxWidth = "50px"
        break
        case "eyeguy":
            alien.style.maxWidth = "50px"
        break
        case "frankenstrike":
            alien.style.maxWidth = "50px"
            alien.style.marginTop = "-8px"
        break
        case "ghostfreak":
            alien.style.maxWidth = "50px"
            alien.style.marginLeft = "-15px"
        break
        case "ghostfreak2":
            alien.style.marginTop = "-10px"
        break
        case "greymatter":
            alien.style.maxWidth = "35px"
        break
        case "heatblast":
            alien.style.maxWidth = "40px"
            alien.style.marginTop = "-10px"
        break
        case "ripjaws":
            alien.style.maxWidth = "50px"
            alien.style.marginTop = "-4px"
        break
        case "stinkfly":
            alien.style.maxWidth = "50px"
            alien.style.marginTop = "-4px"
        break
        case "upgrade":
            alien.style.maxWidth = "70px"
            alien.style.marginTop = "-18px"
            alien.style.marginLeft = "-6px"
        break
        case "waybig":
            alien.style.maxWidth = "45px"
            alien.style.marginTop = "-10px"
        break
        case "wildmut":
            alien.style.maxWidth = "70px"
        break
        case "wildvine":
            alien.style.maxWidth = "45px"
        break
        case "xlr8":
            alien.style.maxWidth = "70px"
        break
    }
}

function accessData(alienName) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        const url = "../data/aliens.json"

        xhr.open("GET", url, true)
        xhr.responseType = "json"

        xhr.onload = () => {
            if (xhr.status === 200) {
                const database = xhr.response
                const name = alienName

                const alien = database.aliens.find(alien => alien.name === name)
                if (alien) {
                    resolve(alien.description)
                } else {
                    reject("Alienígena não encontrado.")
                }
            } else {
                reject("Erro na requisição.")
            }
        }

        xhr.onerror = () => {
            reject(xhr.statusText)
        }

        xhr.send();
    })
}

randomButton.addEventListener("click", () => {
    desactivateClasses()

    const alienNamePromise = showAlien(alienList)
    alienNamePromise.then(alienName => {
        accessData(alienName)
            .then(description => {
                setTimeout(() => {
                    displayNone().then(() => {
                        setTimeout(() => {
                            clockBackground.classList.add("move")
                            info.classList.add("active")
                            headerBackground.style.backgroundImage = `url('assets/imgs/${alienName}.jpg')`
                            headerBackground.classList.add("active")
                            alienInformation.querySelector("h2").innerText = alienName
                            alienInformation.querySelector("p").innerText = description
                        }, 2000)
                    })
                }, 2000)
            })
            .catch(error => {
                console.error("Erro ao acessar os dados:", error)
            })
    })
})

linkedinButton.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/filipe-de-lima-vaz/")
})

githubButton.addEventListener("click", () => {
    window.open("https://github.com/filipelimavaz")
})

refreshButton.addEventListener("click", () => {
    location.reload()
})