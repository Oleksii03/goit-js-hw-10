import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countriesListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('keydown', debounce(onKeydown, DEBOUNCE_DELAY));

function onKeydown(e) {
  const countriName = e.target.value.trim();

  if (countriName === '') {
    return;
  };

  fetchCountries(countriName)
    .then(countries => {
      clearCountries();

      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (countries.length === 1) {
        refs.countryInfoEl.innerHTML = generatingOneCountry(countries[0])
        return;
      }

      refs.countriesListEl.innerHTML = generatingSomeCountry(countries);
    })
    .catch(error => { Notify.failure('Oops, there is no country with that name'); })
};

function clearCountries() {
  refs.countryInfoEl.innerHTML = '';
  refs.countriesListEl.innerHTML = '';
};

const generatingOneCountry = (country) => {
  const languages = country.languages.map(language => { return language.name }).join(', ')

  return `<h2><img src="${country.flags.svg}" alt="${country.name}" width = 100px> ${country.name}</h2> 
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${languages}</p>`;
};

const generatingSomeCountry = (countries) => {
  return countries.map(generatingCountryHTML).join('');
};

function generatingCountryHTML(country) {
  return `<li><img src="${country.flags.svg}" alt="${country.name}" width = 50px> ${country.name}</li>`
};