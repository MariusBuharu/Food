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
  console.log(`.operations__content--${clicked.dataset.tab}`);
  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

let searchQuery = 'pizza';
const recipeIng = document.querySelector('.recipeIngredients');
const recipeImg = document.querySelector('.recipeImg');
const img = document.createElement('img');
const APP_ID = 'f5f1ebde';
const APP_key = '66960d0e2585033d807db12d058da6c1';
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();

  console.log(data.hits[0]);

  const ingredients = data.hits[0].recipe.ingredients;
  const ingr = ingredients.forEach(ing => {
    const html = `
  <li>${ing.text}</li>
  `;
    recipeIng.insertAdjacentHTML('beforeend', html);
    console.log(ing.text);
  });
  img.src = data.hits[0].recipe.image;
  recipeImg.appendChild(img);
}
fetchAPI();
