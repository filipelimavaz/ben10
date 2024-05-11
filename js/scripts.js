const randomButton = document.querySelector("#random-button")

const logo = document.querySelector("#logo")
const rings = document.querySelectorAll(".ring")
const clock1 = document.querySelector("#clock-right")
const clock2 = document.querySelector("#clock-left")
const alien = document.querySelector("#alien")
const clockBackground = document.querySelector(".clock-background")
const info = document.querySelector(".info")
const headerBackground = document.querySelector(".header-background")
const alienInformation = document.querySelector(".info-content")
const linkedinButton = document.querySelector("#linkedin")
const githubButton = document.querySelector("#github")
const refreshButton = document.querySelector("#refresh")

const alienList = []

function fillAlienList() {
    const xhr = new XMLHttpRequest()
    const url = "../data/aliens.json"

    xhr.open("GET", url, true);
    xhr.responseType = "json"

    xhr.onload = () => {
        if (xhr.status === 200) {
            const database = xhr.response;
            database.aliens.forEach(alien => {
                alienList.push(alien.name);
            })
        } else {
            console.error("Erro ao carregar os dados do JSON:", xhr.statusText)
        }
    }
    xhr.onerror = () => {
        console.error("Erro na requisição:", xhr.statusText)
    }
    xhr.send()
}

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
    alien.style.width = ""
    alien.style.marginTop = ""
    alien.style.marginLeft = ""

    switch(string) {
        case "benmummy":
            alien.style.width = "45px"
            alien.style.marginTop = "-10px"
        break
        case "blitzwolfer":
            alien.style.width = "60px"
            alien.style.marginTop = "-10px"
        break
        case "cannonbolt":
            alien.style.width = "80px"
        break
        case "diamondhead":
            alien.style.width = "55px"
            alien.style.marginTop = "-5px"
        break
        case "ditto":
            alien.style.width = "50px"
        break
        case "eyeguy":
            alien.style.width = "50px"
        break
        case "frankenstrike":
            alien.style.width = "50px"
            alien.style.marginTop = "-8px"
        break
        case "ghostfreak":
            alien.style.width = "50px"
            alien.style.marginLeft = "-15px"
        break
        case "ghostfreak2":
            alien.style.width = "50px"
            alien.style.marginTop = "-10px"
        break
        case "greymatter":
            alien.style.width = "35px"
        break
        case "heatblast":
            alien.style.width = "40px"
            alien.style.marginTop = "-10px"
        break
        case "ripjaws":
            alien.style.width = "50px"
            alien.style.marginTop = "-4px"
        break
        case "stinkfly":
            alien.style.width = "50px"
            alien.style.marginTop = "-4px"
        break
        case "upchuck":
            alien.style.width = "60px"
        break
        case "upgrade":
            alien.style.width = "70px"
            alien.style.marginTop = "-18px"
            alien.style.marginLeft = "-6px"
        break
        case "waybig":
            alien.style.width = "45px"
        break
        case "wildmut":
            alien.style.width = "70px"
        break
        case "wildvine":
            alien.style.width = "45px"
        break
        case "xlr8":
            alien.style.width = "70px"
        break
        case "fourarms":
            alien.style.width = "50px"
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

fillAlienList()

randomButton.addEventListener("click", () => {
    desactivateClasses()
    randomButton.disabled = "true"

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
                            if(alienName === "ghostfreak2") {
                                alienInformation.querySelector("h2").innerText = "ghostfreak"
                            } else {
                                alienInformation.querySelector("h2").innerText = alienName
                            }
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