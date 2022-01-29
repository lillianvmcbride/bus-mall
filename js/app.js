'use strict';

var imageElements = document.getElementsByTagName('img');
let product1 = 0;
let product2 = 1;
let product3 = 2;
let allProducts = [];
let totalClicks = 0;

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
new Product('Breakfast Maker', 'assets/imgs/breakfast.jpg');
new Product('Meatball Bubble Gum', 'assets/imgs/bubblegum.jpg', 0, 0);
new Product('Chair', 'assets/imgs/chair.jpg', 0, 0);
new Product('Cthulhu', 'assets/imgs/cthulhu.jpg', 0, 0);
new Product('Duck Muzzle', 'assets/imgs/dog-duck.jpg', 0, 0);
new Product('Dragon Meat', 'assets/imgs/dragon.jpg', 0, 0);
new Product('Pen Silverware', 'assets/imgs/pen.jpg', 0, 0);
new Product('Pet Sweeper', 'assets/imgs/pet-sweep.jpg', 0, 0);
new Product('Pizza Scissors', 'assets/imgs/scissors.jpg', 0, 0);
new Product('Shark Sleeping Bag', 'assets/imgs/shark.jpg', 0, 0);
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
  console.log(data);
  console.log(objectData);
  allProducts = [];
  for(let i = 0; i < objectData.length; i++){
    allProducts.push(new Product(objectData[i].name, objectData[i].imgUrl, objectData[i].timesClicked, objectData[i].timesSeen));
  }
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

function displayResults() {
  for (let j = 0; j < imageElements.length; j++) {
    imageElements[j].removeEventListener('click', imageWasClicked, false);
  }
  var resultsElement = document.getElementsByTagName('aside')[0];
  if(resultsElement.firstElementChild){
    resultsElement.firstElementChild.remove();
  }
  var title = document.createElement('h2');
  title.textContent = 'Results';
  resultsElement.appendChild(title);
  var createUL = document.createElement('ul');
  for (var i=0; i < allProducts.length; i++){
    var createLI = document.createElement('li');
    if (allProducts[i].timesClicked === 1) {
      createLI.textContent = allProducts[i].name + ' was shown ' + allProducts[i].timesSeen + ' times and received ' + allProducts[i].timesClicked + ' vote.';
      createUL.appendChild(createLI);
    }
    else if (allProducts[i].timesClicked === 0){
      createLI.textContent = allProducts[i].name + ' was shown ' + allProducts[i].timesSeen + ' times.';
      createUL.appendChild(createLI);
    }
    else {
      createLI.textContent = allProducts[i].name + ' was shown ' + allProducts[i].timesSeen + ' times and received ' + allProducts[i].timesClicked + ' votes.';
      createUL.appendChild(createLI);
    }
  }
  resultsElement.appendChild(createUL);
  runChart();
}

// a very large function
function imageWasClicked(event) {
  totalClicks++;
  updateStorage();
  //retrieveStorage();
  console.log(totalClicks);
  if(event.srcElement.id === '1') {
    allProducts[product1].timesClicked++;
  } else if (event.srcElement.id === '2') {
    allProducts[product2].timesClicked++;
  } else if (event.srcElement.id === '3') {
    allProducts[product3].timesClicked++;
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

  // assigning new random product to each position in imageElements and keeping track of number of times each product is seen
  product1 = nextProduct1;
  allProducts[product1].timesSeen++;
  product2 = nextProduct2;
  allProducts[product2].timesSeen++;
  product3 = nextProduct3;
  allProducts[product3].timesSeen++;

  // displaying images
  imageElements[0].src = allProducts[product1].imageUrl;
  imageElements[1].src = allProducts[product2].imageUrl;
  imageElements[2].src = allProducts[product3].imageUrl;

  if (totalClicks === 25) {
    displayResults();
  }
}

for (var i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener('click', imageWasClicked);
}
