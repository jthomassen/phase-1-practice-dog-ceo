console.log('%c HI', 'color: firebrick')

const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
 
const imgDiv = document.getElementById('dog-image-container');
const breedUl = document.getElementById('dog-breeds');
const filterEl = document.getElementById('breed-dropdown');
 
let filterLetter = '';
let breedArr = [];
 
breedUl.addEventListener('click', (e) => {
  e.target.classList.add('dog-clicked');
});
 
filterEl.addEventListener('change', (e) => {
  filterLetter = e.target.value;
  renderBreeds();
});
 
fetch(imgUrl)
  .then((res) => res.json())
  .then((data) => addImageElements(data.message))
  .catch((err) => console.error('HERE IS THE ERROR', err));
 
fetch(breedUrl)
  .then((res) => res.json())
  .then((data) => {
    breedObject = data.message;
    createBreedList(breedObject);
    renderBreeds();
  });
 
function addImageElements(imgArr) {
  imgArr.forEach(addImage);
}
 
function addImage(imgUrl) {
  const dogImg = document.createElement('img');
  dogImg.src = imgUrl;
  dogImg.classList.add('dog-image');
  imgDiv.append(dogImg);
}
 
function createBreedList(itemObject) {
  breedArr = [];
  const itemKeys = Object.keys(itemObject);
 
  itemKeys.forEach((breed) => {
    breedArr.push(breed);
    itemObject[breed].forEach((sb) => breedArr.push(`${sb} ${breed}`));
  });
}
 
function renderBreeds() {
  breedUl.innerHTML = '';
  breedArr.filter((e) => e.startsWith(filterLetter)).forEach(renderBreed);
}
 
function renderBreed(breed) {
  const breedLi = document.createElement('li');
  breedLi.innerText = breed;
  breedUl.append(breedLi);
}