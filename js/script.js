// key: 36210284b4a1ddbd5981080ca59b54ea

const key = "36210284b4a1ddbd5981080ca59b54ea";

const btnPesq = document.querySelector("#btnPesq");
const inputPesq = document.querySelector(".pesq input");

const locCity = document.querySelector("#locCity");
const imgTemp = document.querySelector(".temp img");
const tempCels = document.querySelector(".temp h2");
const tempDescrip = document.querySelector(".description span");
const tempMax = document.querySelector(".temp_max span");
const tempMin = document.querySelector(".temp_min span");
const velVento = document.querySelector("#vel_vento");
const umidAr = document.querySelector("#umid");

const classDates = document.querySelector(".dates");

const container = document.querySelector(".container")

const loading = document.querySelector(".cont_loading");

const errorMessage =  document.querySelector(".error_message");

/* Busca API */

const dadosAPI = async (city)=>{
    const apiBusc = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=pt_br`;

    const dateFetch = await fetch(apiBusc);
    const date = await dateFetch.json();

    return date
}

/* Função Mostrar */
const mostrarDates = async (city)=>{

    const date = await dadosAPI(city);

    locCity.innerHTML = `${date.name} - ${date.sys.country}`;
    imgTemp.setAttribute("src", `http://openweathermap.org/img/wn/${date.weather[0].icon}.png`);
    tempCels.innerHTML=`${parseInt(date.main.temp)}&deg;C`;
    tempDescrip.innerText=` ${date.weather[0].description}`;
    tempMax.innerHTML=` ${parseInt(date.main.temp_max)}&deg;C`;
    tempMin.innerHTML=` ${parseInt(date.main.temp_min)}&deg;C`;
    velVento.innerText=`${date.wind.speed} km/h`;
    umidAr.innerText=`${date.main.humidity}%`;

}

/* Evento que desencadeia os dados */

btnPesq.addEventListener("click", async ()=>{

    classLoading();
    errorMessage.classList.remove("aparecer_block");
    const city = inputPesq.value;
    const date = await dadosAPI(city);

    if(date.cod === "404" || date.cod === "400"){
        mostrarErrorMessage();
        return;
    }else{
        setTimeout(function(){
        mostrarDates(city);
        }, "1000");
        setTimeout(function(){
        aparecaDates();
        }, "2000");
    }
    
})

/* Fazer com que os dados apareçam/desaparecam */

const aparecaDates = ()=>{
    classDates.classList.add("aparecer");
    container.classList.add("crescer")
}

const desaparecaDates = ()=>{
    classDates.classList.remove("aparecer");
    container.classList.remove("crescer")
}

/* Tela de carregamento */

const classLoading = ()=>{
    desaparecaDates();
    loading.classList.add("aparecer_block");
    setTimeout(function(){
        loading.classList.remove("aparecer_block");
    }, 2200);
}

/* Tratar erro */
const mostrarErrorMessage = ()=>{
    setTimeout(function(){
        errorMessage.classList.add("aparecer_block");
    }, 2000)
}