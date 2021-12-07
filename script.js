'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, nei) {
    console.log(data);
    const html = `
    <article class="country ${nei}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}}</h4>
      <p class="country__row"><span> 👫 ${(+data.population / 1000000).toFixed(1)}  </span>POP people</p>

      <p class="country__row"><span>🗣️ ${Object.keys(data.languages).length}</span> </p>
      <p class="country__row"><span>💰 ${data.currencies.name}</span>CUR</p>
    </div>
  </article>`;

    // console.log(html)
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
}
// const getCountryData = function (country) {

//     // Ajax Call country
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     // console.log(request.responseText)
//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);

//         // Render Country
//         renderCountry(data);


//     })
// }

// getCountryData(`india`);
// getCountryData('USA')

// const request = fetch(`https://restcountries.com/v3.1/name/india}`)
// console.log(request);

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (response) {
//         console.log(request);
//         return response.json();
//     }).then(function (data) {
//         console.log(...data);
//         renderCountry(data[0])
//     })
// }

// getCountryData('india')

// const request = fetch(`https://restcountries.com/v3.1/name/india}`)
// console.log(request);

const getJSON = function (url, errorMsg = "Something went wrong") {

    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`(${errorMsg}) ${response.status}`);

        return response.json();
    })
}

const getCountryData = function (country) {
    // country 1
    getJSON(`https://restcountries.com/v3.1/name/${country}`,
        `Country not found `)


        .then(function (data) {
            renderCountry(data[0]);
            const neighbor = data[0].borders[0];


            if (!neighbor) throw new Error('No neighbor found !');

            // country 2
            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbor}3`, 'Neighbor Country not fount');
        })

        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.error('Errror', err)
            renderError(`Something Went wrong 🔥🔥🔥🔥${err.message}`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        })


}
btn.addEventListener('click', function () {
    getCountryData('india')
})
