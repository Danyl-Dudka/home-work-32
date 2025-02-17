let currentButton = "people";
let infoUrl = `https://swapi.dev/api/${currentButton}`;
const navigationDiv = document.querySelector('.description_item');
const loadMoreButton = document.querySelector('.load-more');
const peopleButton = document.querySelector(".people_button");
const vehiclesButton = document.querySelector('.vehicles_button')
const planetsButton = document.querySelector('.planets_button');
const parent = document.querySelector('.description_item .data');