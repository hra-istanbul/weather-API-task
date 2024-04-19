const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button")
wIcon = document.querySelector(".weather-part img")
arrowBack = document.querySelector("header i")
let api;

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
})

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a16e33bdb752c9b5778d38c42614a6e4`;
    fetchData()
}

function fetchData() {
    infoTxt.innerText = "sorgu dogurlanir"
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText = `${inputField.value} bele bir seher yoxdu...`
    } else {
        const city = info.name
        const country = info.sys.country
        const { description, icon } = info.weather[0]
        const { feels_like, humidity, temp } = info.main


        wIcon = document.querySelector(".weather-part img").src = "https://openweathermap.org/img/wn/" + icon + ".png"

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location").innerText = `${city}, ${country}`
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`


        infoTxt.classList.remove("pending", "error")
        wrapper.classList.add("active")

    }

}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active")
})