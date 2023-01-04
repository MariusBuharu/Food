'use strict';
const sliderImages = document.querySelectorAll('.slide');
const arrowLeft = document.querySelector('#arrow-left');
const arrowRight = document.querySelector('#arrow-right');
const form = document.querySelector('.contact-form');
const btnForm = document.querySelector('.btn-form');
let current = 0;
const firstName = form.elements['fName'];
const lastName = form.elements['lName'];
const email = form.elements['email'];
const subject = form.elements['subject'];
const message = form.elements['message'];
const btnSubmit = document.querySelector('.submit');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
firstName.isValid = () => firstName.value;
lastName.isValid = () => lastName.value;
email.isValid = () => isValidEmail(email.value);
subject.isValid = () => subject.value;
message.isValid = () => message.value;

const inputFields = [firstName, lastName, email, subject, message];
const isValidEmail = email => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
let shouldValidate = false;
let isFormValid = false;

const reset = () => {
  sliderImages.forEach(slide => {
    slide.classList.add('hide');
  });
};

const validateInputs = () => {
  if (!shouldValidate) return;

  isFormValid = true;
  inputFields.forEach(input => {
    input.classList.remove('invalid');
    input.nextElementSibling.classList.add('hide');

    if (!input.isValid()) {
      input.classList.add('invalid');
      isFormValid = false;
      input.nextElementSibling.classList.remove('hide');
    }
  });
};

inputFields.forEach(input => input.addEventListener('input', validateInputs));
const startSlide = () => {
  reset();
  sliderImages[0].classList.remove('hide');
};

const slideLeft = () => {
  reset();
  sliderImages[current - 1].classList.remove('hide');
  current--;
};
const slideRight = () => {
  reset();
  sliderImages[current + 1].classList.remove('hide');
  current++;
};

arrowLeft.addEventListener('click', function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

arrowRight.addEventListener('click', function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();

btnForm.addEventListener('click', function () {
  form.classList.toggle('hideForm');
  if (form.classList.contains('hideForm')) {
    btnForm.textContent = 'Get Started';
  } else {
    btnForm.textContent = 'Close form';
  }
});
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const clearInputs = () => {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  subject.value = '';
  message.value = '';
};

btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();

  shouldValidate = true;
  validateInputs();
  if (isFormValid) {
    openModal();
    clearInputs();
  }
});

//!Operations
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//! API

let searchQuery = 'pizza';
const recipeIng = document.querySelector('.recipeIngredients');
const recipeIng1 = document.querySelector('.recipeIngredients1');
const recipeIng2 = document.querySelector('.recipeIngredients2');
const recipeIng3 = document.querySelector('.recipeIngredients3');
const recipeIng4 = document.querySelector('.recipeIngredients4');
const recipeImg = document.querySelector('.recipeImg');
const recipeImg1 = document.querySelector('.recipeImg1');
const recipeImg2 = document.querySelector('.recipeImg2');
const recipeImg3 = document.querySelector('.recipeImg3');
const recipeImg4 = document.querySelector('.recipeImg4');
const recipeTitle = document.querySelector('.titleIng');
const recipeTitle1 = document.querySelector('.titleIng1');
const recipeTitle2 = document.querySelector('.titleIng2');
const recipeTitle3 = document.querySelector('.titleIng3');
const recipeTitle4 = document.querySelector('.titleIng4');
const titlesEl = [
  recipeTitle,
  recipeTitle1,
  recipeTitle2,
  recipeTitle3,
  recipeTitle4,
];
const imagesEl = [recipeImg, recipeImg1, recipeImg2, recipeImg3, recipeImg4];
const recipesEl = [recipeIng, recipeIng1, recipeIng2, recipeIng3, recipeIng4];

const APP_ID = 'f5f1ebde';
const APP_key = '66960d0e2585033d807db12d058da6c1';

//?Insert HTML

const insertHtml = function (el, data) {
  const html = `
  <li>${data.text}</li>
  `;
  el.insertAdjacentHTML('beforeend', html);
};
//? Insert Images
const insertImage = function (el, link) {
  const img = document.createElement('img');
  img.src = link;
  img.classList.add('imageStyle');
  el.insertAdjacentElement('beforeend', img);
};

async function fetchAPI() {
  try {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    const response = await fetch(baseURL);
    if (!response.ok) return new Error('Server could not be reached');
    const data = await response.json();
    const recipes = data.hits;

    recipesEl.forEach((el, index) => {
      const ingredients = recipes[index].recipe.ingredients;
      const imgLink = recipes[index].recipe.image;
      const title = recipes[index].recipe.label;
      titlesEl[index].textContent = title;
      ingredients.forEach(ing => {
        insertHtml(el, ing);
      });
      insertImage(recipesEl[index], imgLink);
    });
  } catch (error) {
    console.log(error);
  }
}
fetchAPI();
