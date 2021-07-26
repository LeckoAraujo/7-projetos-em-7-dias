document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfor();
        showWarning('Carregando...');

        let key = '88e7f63d1b6f1b413591ddec97caf8a2';

        let city = encodeURI(input);

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`;

        let results = await fetch(url);

        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfor();
            showWarning('Não encontramos esta cidade');
        }
    } else {
        clearInfor();
        showWarning('Por favor digite algo antes de clicar em buscar.')
    }
});

function showInfo(json){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate((${json.windAngle} - 90)deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfor(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}