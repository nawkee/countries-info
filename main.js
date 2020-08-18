let info = document.querySelector('#info');
let title = document.querySelector('#title');
let infoText = document.querySelector('#info-text');
let nameInput = document.querySelector('#name-input');
let button = document.querySelector('#activator');

button.addEventListener('click', getInfo);
window.addEventListener('keyup',e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        button.click();
    }
});

function getInfo() {
    let country = nameInput.value;
    let url = `https://restcountries.eu/rest/v2/name/${country}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function () {
        info.style.display = 'none';
        infoText.innerHTML = '';
        if (this.status === 200 && country !== '') {
            info.style.display = 'block';
            title.innerHTML = `Info about ${country}`;
            let parsedInfo = JSON.parse(this.responseText)[0];
            infoText.innerHTML = `
                Name: ${parsedInfo.name}<br>
                Domain: ${parsedInfo.topLevelDomain}<br>
                Capital: ${parsedInfo.capital}<br>
                Region: ${parsedInfo.region}<br>
                Population: ${parsedInfo.population}<br>
                Area: ${parsedInfo.area} km²<br>
                Timezones: ${parsedInfo.timezones}<br>
                Currency: ${parsedInfo.currencies[0].code}, ${parsedInfo.currencies[0].name}<br>
                Languages: ${parsedInfo.languages[0].name}<br>
            `;
        }
    };
    xhr.send();
}