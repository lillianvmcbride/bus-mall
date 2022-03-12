'use strict';

var resultsElement = document.getElementsByTagName('aside')[0];
var imageElements = document.getElementsByTagName('img');
var reset = document.getElementById('reset');
let product1 = 0;
let product2 = 1;
let product3 = 2;
let allProducts = [];
let totalClicks = 0;
let clicksLeft = 25;

//constructor function
function Product(name, imageUrl, click, seen) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = click;
  this.timesSeen = seen;
  allProducts.push(this);
}

//create new objects
new Product('Bag', 'assets/imgs/bag.jpg', 0, 0);
new Product('Banana Slicer', 'assets/imgs/banana.jpg', 0, 0);
new Product('Tablet Stand', 'assets/imgs/bathroom.jpg', 0, 0);
new Product('Toeless Boots', 'assets/imgs/boots.jpg', 0, 0);
new Product('Breakfast Maker', 'assets/imgs/breakfast.jpg', 0, 0);
new Product('Meatball Bubble Gum', 'assets/imgs/bubblegum.jpg', 0, 0);
new Product('Chair', 'assets/imgs/chair.jpg', 0, 0);
new Product('Cthulhu', 'assets/imgs/cthulhu.jpg', 0, 0);
new Product('Duck Muzzle', 'assets/imgs/dog-duck.jpg', 0, 0);
new Product('Dragon Meat', 'assets/imgs/dragon.jpg', 0, 1);
new Product('Pen Silverware', 'assets/imgs/pen.jpg', 0, 0);
new Product('Pet Sweeper', 'assets/imgs/pet-sweep.jpg', 0, 1);
new Product('Pizza Scissors', 'assets/imgs/scissors.jpg', 0, 0);
new Product('Shark Sleeping Bag', 'assets/imgs/shark.jpg', 0, 1);
new Product('Baby Sweeper', 'assets/imgs/sweep.png', 0, 0);
new Product('Tauntain Sleeping Bag', 'assets/imgs/tauntaun.jpg', 0, 0);
new Product('Unicorn Meat', 'assets/imgs/unicorn.jpg', 0, 0);
new Product('Watering Can', 'assets/imgs/water-can.jpg', 0, 0);
new Product('Wine Glass', 'assets/imgs/wine-glass.jpg', 0, 0);

function updateStorage() {
  let productString = JSON.stringify(allProducts);
  localStorage.setItem('productString', productString);
}

function retrieveStorage() {
  let data = localStorage.getItem('productString');
  let objectData = JSON.parse(data);
  let newAllProducts = [];
  for(let i = 0; i < objectData.length; i++){
    newAllProducts.push(new Product(objectData[i].name, objectData[i].imgUrl, objectData[i].timesClicked, objectData[i].timesSeen));
  }
  allProducts = [];
  allProducts = newAllProducts;
}

function getProductArrProp(nameOfProperty) {
  var answer = [];
  for (var i = 0; i < allProducts.length; i++) {
    answer[i] = allProducts[i][nameOfProperty];
  }
  return answer;
}

function runChart() {
  let chart = document.getElementById('resultsChart').getContext('2d');
  var myChart = new Chart(chart, {
    type: 'polarArea',
    data: {
      options: {},
      labels: getProductArrProp('name'),
      datasets: [{
        label: 'Number of Votes',
        data: getProductArrProp('timesClicked'),
        border: 'black',
        backgroundColor: [
          'rgb(128,0,0)',
          'rgb(255,0,0)',
          'rgb(255,127,80)',
          'rgb(	240,128,128)',
          'rgb(255,215,0)',
          'rgb(184,134,11)',
          'rgb(240,230,140)',
          'rgb(154,205,50)',
          'rgb(85,107,47)',
          'rgb(0,128,0)',
          'rgb(32,178,170)',
          'rgb(0,255,255)',
          'rgb(100,149,237)',
          'rgb(138,43,226)',
          'rgb(128,0,128'
        ]
      }]
    }
  });
}

function displayImages() {
  imageElements[0].src = allProducts[product1].imageUrl;
  allProducts[product1].timesSeen++;
  imageElements[1].src = allProducts[product2].imageUrl;
  allProducts[product2].timesSeen++;
  imageElements[2].src = allProducts[product3].imageUrl;
  allProducts[product3].timesSeen++;
}

function displayResults() {
  resultsElement.style.display = 'block';
  if(resultsElement.firstElementChild){
    resultsElement.firstElementChild.remove();
  }
  var title = document.createElement('h2');
  title.textContent = 'Results';
  resultsElement.appendChild(title);
  var createUL = document.createElement('ul');
  for (var i=0; i < allProducts.length; i++){
    var createLI = document.createElement('li');
    if (allProducts[i].timesSeen === 1 && allProducts[i].timesClicked === 1) {
      createLI.textContent = allProducts[i].name + ' was shown 1 time and received 1 vote.';
    }
    else if (allProducts[i].timesSeen === 1) {
      createLI.textContent = allProducts[i].name + ' was shown 1 time..';
    }
    else if (allProducts[i].timesClicked === 1) {
      createLI.textContent = allProducts[i].name + ' was shown ' + allProducts[i].timesSeen + ' times and received ' + allProducts[i].timesClicked + ' vote.';
      createUL.appendChild(createLI);
    }
    else if (allProducts[i].timesClicked === 0){
      createLI.textContent = allProducts[i].name + ' was shown ' + allProducts[i].timesSeen + ' times this round.';
      createUL.appendChild(createLI);
    }
    else {
      createLI.textContent = allProducts[i].name + ' was shown ' + allProducts[i].timesSeen + ' times this round and received ' + allProducts[i].timesClicked + ' votes.';
      createUL.appendChild(createLI);
    }
  }
  resultsElement.appendChild(createUL);
  runChart();
}

function resetButton(event) {
  clicksLeft = 25;
  let clicks = document.getElementById('clicks');
  clicks.textContent = clicksLeft - totalClicks + ' Clicks Remaining';
}

// a very large function
function imageWasClicked(event) {
  clicksLeft--;
  displayImages();
  if(event.srcElement.id === '1') {
    allProducts[product1].timesClicked++;
  } else if (event.srcElement.id === '2') {
    allProducts[product2].timesClicked++;
  } else if (event.srcElement.id === '3') {
    allProducts[product3].timesClicked++;
  }
  let clicks = document.getElementById('clicks');
  clicks.textContent = clicksLeft - totalClicks + ' Clicks Remaining';
  if (clicksLeft === 0) {
    let button = document.getElementById('newRound');
    button.style.display = 'inline';
    for (let j = 0; j < imageElements.length; j++) {
      imageElements[j].removeEventListener('click', imageWasClicked, false);
    }
    let goAway = document.getElementById('imageContainer');
    goAway.remove();
    let canvasDiv = document.getElementById('canvas');
    let canvas = document.createElement('canvas');
    canvas.id = 'resultsChart';
    canvasDiv.appendChild(canvas);
    updateStorage();
    retrieveStorage();
    displayResults();
  }

  //picks random product to display and checks against duplicates
  let nextProduct1 = Math.floor(Math.random() * allProducts.length);
  while((nextProduct1 === product1) || (nextProduct1 === product2) || (nextProduct1 === product3)) {
    nextProduct1 = Math.floor(Math.random() * allProducts.length);
  }
  let nextProduct2 = Math.floor(Math.random() * allProducts.length);
  while((nextProduct2 === product1) || (nextProduct2 === product2) || (nextProduct2 === product3) || (nextProduct2 === nextProduct1)) {
    nextProduct2 = Math.floor(Math.random() * allProducts.length);
  }
  let nextProduct3 = Math.floor(Math.random() * allProducts.length);
  while((nextProduct3 === product1) || (nextProduct3 === product2) || (nextProduct3 === product3) || (nextProduct3 === nextProduct1) || (nextProduct3 === nextProduct2)) {
    nextProduct3 = Math.floor(Math.random() * allProducts.length);
  }

  // assigning new random product to each position in imageElements
  product1 = nextProduct1;
  product2 = nextProduct2;
  product3 = nextProduct3;

  updateStorage();
}

for (var i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener('click', imageWasClicked);
}

reset.addEventListener('click', resetButton);

