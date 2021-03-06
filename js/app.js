'use strict';

var resultsElement = document.getElementsByTagName('aside')[0];
var imageElements = document.getElementsByTagName('img');
var reset = document.getElementById('reset');
var continuing = document.getElementById('continue');
let product1 = 0;
let product2 = 1;
let product3 = 2;
let allProducts = [];
let totalClicks = 0;
let clicksLeft = 25;

//constructor function
function Product(name, imageUrl, click, seen, color) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = click;
  this.timesSeen = seen;
  this.color = color;
  allProducts.push(this);
}

//create new objects
new Product('Bag', 'assets/imgs/bag.jpg', 0, 0, 'rgb(128,0,0)');
new Product('Banana Slicer', 'assets/imgs/banana.jpg', 0, 0, 'rgb(255,0,0)');
new Product('Tablet Stand', 'assets/imgs/bathroom.jpg', 0, 0, 'rgb(238,3,136)');
new Product('Toeless Boots', 'assets/imgs/boots.jpg', 0, 0, 'rgb(240,128,128)');
new Product('Breakfast Maker', 'assets/imgs/breakfast.jpg', 0, 0, 'rgb(255,103,0)');
new Product('Meatball Bubble Gum', 'assets/imgs/bubblegum.jpg', 0, 0, 'rgb(255,170,0)');
new Product('Chair', 'assets/imgs/chair.jpg', 0, 0, 'rgb(255,215,0)');
new Product('Cthulhu', 'assets/imgs/cthulhu.jpg', 0, 0, 'rgb(240,230,140)');
new Product('Duck Muzzle', 'assets/imgs/dog-duck.jpg', 0, 0, 'rgb(184,134,11)');
new Product('Dragon Meat', 'assets/imgs/dragon.jpg', 0, 1, 'rgb(154,205,50)');
new Product('Pen Silverware', 'assets/imgs/pen.jpg', 0, 0, 'rgb(0,128,0)');
new Product('Pet Sweeper', 'assets/imgs/pet-sweep.jpg', 0, 1, 'rgb(85,107,47)');
new Product('Pizza Scissors', 'assets/imgs/scissors.jpg', 0, 0, 'rgb(32,178,170)');
new Product('Shark Sleeping Bag', 'assets/imgs/shark.jpg', 0, 1, 'rgb(0,255,255)');
new Product('Baby Sweeper', 'assets/imgs/sweep.png', 0, 0, 'rgb(100,149,237)');
new Product('Tauntain Sleeping Bag', 'assets/imgs/tauntaun.jpg', 0, 0, 'rgb(7,7,147)');
new Product('Unicorn Meat', 'assets/imgs/unicorn.jpg', 0, 0, 'rgb(138,43,226)');
new Product('Watering Can', 'assets/imgs/water-can.jpg', 0, 0, 'rgb(128,0,128)');
new Product('Wine Glass', 'assets/imgs/wine-glass.jpg', 0, 0, 'rgb(0,0,0)');

function updateStorage() {
  let productString = JSON.stringify(allProducts);
  localStorage.setItem('productString', productString);
}

function retrieveStorage() {
  let data = localStorage.getItem('productString');
  let objectData = JSON.parse(data);
  let newAllProducts = [];
  for(let i = 0; i < objectData.length; i++){
    newAllProducts.push(new Product(objectData[i].name, objectData[i].imgUrl, objectData[i].timesClicked, objectData[i].timesSeen, objectData[i].color));
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
          'rgb(238,3,136)',
          'rgb(240,128,128)',
          'rgb(255,103,0)',
          'rgb(255,170,0)',
          'rgb(255,215,0)',
          'rgb(240,230,140)',
          'rgb(184,134,11)',
          'rgb(154,205,50)',
          'rgb(0,128,0)',
          'rgb(85,107,47)',
          'rgb(32,178,170)',
          'rgb(0,255,255)',
          'rgb(100,149,237)',
          'rgb(7,7,147)',
          'rgb(138,43,226)',
          'rgb(128,0,128)',
          'rgb(0,0,0)',

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
  let table = document.getElementsByTagName('table')[0];
  let firstRow = document.createElement('tr');
  let place = document.createElement('td');
  place.id = 'place';
  let color = document.createElement('td');
  color.id = 'color';
  let thing = document.createElement('td');
  thing.id = 'thing';
  thing.textContent = 'Product';
  let seen = document.createElement('td');
  seen.textContent = 'Times Seen';
  let clicked = document.createElement('td');
  clicked.textContent = 'Times Clicked';
  firstRow.appendChild(place);
  firstRow.appendChild(color);
  firstRow.appendChild(thing);
  firstRow.appendChild(seen);
  firstRow.appendChild(clicked);
  table.appendChild(firstRow);
  let sortedProducts = [];
  for (let i = 0; i < allProducts.length; i++) {
    sortedProducts.push(allProducts[i]);
  }
  for (let i = 0; i < sortedProducts.length; i++) {
    for (let j = i + 1; j < sortedProducts.length; j++)
      if (sortedProducts[i].timesClicked < sortedProducts[j].timesClicked) {
        let storage = sortedProducts[i];
        sortedProducts[i] = sortedProducts[j];
        sortedProducts[j] = storage;
      }
  }
  let leaderBoard = sortedProducts.slice(0, 3);

  let firstPlace = document.createElement('tr');
  let numberOne = document.createElement('td');
  let oneColor = document.createElement('td');
  let oneClicked = document.createElement('td');
  oneClicked.textContent = leaderBoard[0].timesClicked;
  let oneSeen = document.createElement('td');
  oneSeen.textContent = leaderBoard[0].timesSeen;
  oneColor.style.backgroundColor = leaderBoard[0].color;
  let oneProduct = document.createElement('td');
  oneProduct.textContent = leaderBoard[0].name;
  numberOne.id = 'one';
  numberOne.textContent = '#1';
  firstPlace.appendChild(numberOne);
  firstPlace.appendChild(oneColor);
  firstPlace.appendChild(oneProduct);
  firstPlace.appendChild(oneSeen);
  firstPlace.appendChild(oneClicked);
  table.appendChild(firstPlace);

  let secondPlace = document.createElement('tr');
  let numberTwo = document.createElement('td');
  let twoColor = document.createElement('td');
  let twoClicked = document.createElement('td');
  twoClicked.textContent = leaderBoard[1].timesClicked;
  let twoSeen = document.createElement('td');
  twoSeen.textContent = leaderBoard[1].timesSeen;
  twoColor.style.backgroundColor = leaderBoard[1].color;
  let twoProduct = document.createElement('td');
  twoProduct.textContent = leaderBoard[1].name;
  numberTwo.id = 'two';
  numberTwo.textContent = '#2';
  secondPlace.appendChild(numberTwo);
  secondPlace.appendChild(twoColor);
  secondPlace.appendChild(twoProduct);
  secondPlace.appendChild(twoSeen);
  secondPlace.appendChild(twoClicked);
  table.appendChild(secondPlace);

  let thirdPlace = document.createElement('tr');
  let numberThree = document.createElement('td');
  let threeColor = document.createElement('td');
  let threeClicked = document.createElement('td');
  threeClicked.textContent = leaderBoard[2].timesClicked;
  let threeSeen = document.createElement('td');
  threeSeen.textContent = leaderBoard[2].timesSeen;
  threeColor.style.backgroundColor = leaderBoard[2].color;
  let threeProduct = document.createElement('td');
  threeProduct.textContent = leaderBoard[2].name;
  numberThree.id = 'three';
  numberThree.textContent = '#3';
  thirdPlace.appendChild(numberThree);
  thirdPlace.appendChild(threeColor);
  thirdPlace.appendChild(threeProduct);
  thirdPlace.appendChild(threeSeen);
  thirdPlace.appendChild(threeClicked);
  table.appendChild(thirdPlace);

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
    let button1 = document.getElementById('continue');
    button1.style.display = 'block';
    let button2 = document.getElementById('newRound');
    button2.style.display = 'inline';
    for (let j = 0; j < imageElements.length; j++) {
      imageElements[j].removeEventListener('click', imageWasClicked, false);
    }
    let title = document.getElementById('title');
    let goAway = document.getElementById('imageContainer');
    title.remove();
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

continuing.addEventListener('click', resetButton);

