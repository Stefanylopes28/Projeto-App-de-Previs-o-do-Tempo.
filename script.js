document.addEventListener('DOMContentLoaded', function () {
    const bgClasses = [
        'bg-image-1', 'bg-image-2', 'bg-image-3', 'bg-image-4', 
        'bg-image-5', 'bg-image-6', 'bg-image-7', 'bg-image-8', 
        'bg-image-9', 'bg-image-10', 'bg-image-11', 'bg-image-12', 
        'bg-image-13', 'bg-image-14', 'bg-image-15', 'bg-image-16', 
        'bg-image-17', 'bg-image-18', 'bg-image-19', 'bg-image-20', 
        'bg-image-21'
    ];

    let currentIndex = 0;

    function changeBackgroundImage() {
        document.body.classList.remove(bgClasses[currentIndex]);
        currentIndex = (currentIndex + 1) % bgClasses.length;
        document.body.classList.add(bgClasses[currentIndex]);
    }

    setInterval(changeBackgroundImage, 3000);
    document.body.classList.add(bgClasses[currentIndex]);

    const imgPrevisaoElements = document.querySelectorAll('.img-previsao');
    imgPrevisaoElements.forEach(img => {
        img.addEventListener('mouseenter', aumentarGif);
        img.addEventListener('mouseleave', diminuirGif);
    });

    document.querySelector('.botao-busca').addEventListener('click', cliqueiNoBotao);
});

const key = "70f517fcd530276eeb868ab37e918930";

function colocarDadosNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = `Tempo em ${dados.name}`;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "ºC";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = `Umidade ${dados.main.humidity}%`;

    let gifURL;
    const condition = dados.weather[0].main.toLowerCase();
    const currentTime = new Date().getHours();
    const sunrise = new Date(dados.sys.sunrise * 1000).getHours();
    const sunset = new Date(dados.sys.sunset * 1000).getHours();
    const isDaytime = currentTime >= sunrise && currentTime < sunset;

    if (isDaytime) {
        if (condition.includes("clear")) {
            gifURL = 'url("https://i.gifer.com/14SE.gif")';
        } else if (condition.includes("clouds")) {
            gifURL = 'url("https://i.gifer.com/3klZ.gif")';
        } else if (condition.includes("rain")) {
            gifURL = 'url("https://i.gifer.com/156U.gif")';
        } else {
            gifURL = 'url("https://i.gifer.com/6Mvn.gif")';
        }
    } else {
        if (condition.includes("clear")) {
            gifURL = 'url("https://i.gifer.com/xuJ.gif")';
        } else if (condition.includes("clouds")) {
            gifURL = 'url("https://i.gifer.com/CTa.gif")';
        } else if (condition.includes("rain")) {
            gifURL = 'url("https://i.gifer.com/5z4f.gif")';
        } else {
            gifURL = 'url("https://i.gifer.com/CTQ.gif")';
        }
    }
    
    document.querySelector(".img-previsao").style.backgroundImage = gifURL;
}

async function buscarEstado(cidade) {
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${key}&lang=pt_br&units=metric`);
        const dados = await resposta.json();
        colocarDadosNaTela(dados);
    } catch (error) {
        console.error("Erro ao buscar dados do estado:", error);
    }
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-estado").value;
    buscarEstado(cidade);
}

function aumentarGif(event) {
    const gif = event.target;
    gif.style.width = '200px';
}

function diminuirGif(event) {
    const gif = event.target;
    gif.style.width = '100px';
}
