'use strict';

var imageElements = document.getElementsByTagName('img');
let product1 = 0;
let product2 = 1;
let product3 = 2;
let allProducts = [];
let totalClicks = 0;
let rounds = 25;

//constructor function
function Product(name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0 ;
  allProducts.push(this);
  this.timesSeen = 0;
}

//create new objects
new Product('Bag', 'assets/imgs/bag.jpg');
new Product('Banana Slicer', 'assets/imgs/banana.jpg');
new Product('Tablet Stand', 'assets/imgs/bathroom.jpg');
new Product('Toeless Boots', 'assets/imgs/boots.jpg');
new Product('Breakfast Maker', 'assets/imgs/breakfast.jpg');
new Product('Meatball Bubble Gum', 'assets/imgs/bubblegum.jpg');
new Product('Chair', 'assets/imgs/chair.jpg');
new Product('Cthulhu', 'assets/imgs/cthulhu.jpg');
new Product('Duck Muzzle', 'assets/imgs/dog-duck.jpg');
new Product('Dragon Meat', 'assets/imgs/dragon.jpg');
new Product('Pen Silverware', 'assets/imgs/pen.jpg');
new Product('Pet Sweeper', 'assets/imgs/pet-sweep.jpg');
new Product('Pizza Scissors', 'assets/imgs/scissors.jpg');
new Product('Shark Sleeping Bag', 'assets/imgs/shark.jpg');
new Product('Baby Sweeper', 'assets/imgs/sweep.png');
new Product('Tauntain Sleeping Bag', 'assets/imgs/tauntaun.jpg');
new Product('Unicorn Meat', 'assets/imgs/unicorn.jpg');
new Product('Watering Can', 'assets/imgs/water-can.jpg');
new Product('Wine Glass', 'assets/imgs/wine-glass.jpg');

// a very large function
function imageWasClicked(event) {
  totalClicks++;
  if(event.srcElement.id === '1') {
    allProducts[product1].timesClicked++;
  } else if (event.srcElement.id === '2') {
    allProducts[product2].timesClicked++;
  } else if (event.srcElement.id === '3') {
    allProducts[product3].timesClicked++;
  }

  // accounting for first three products being seen
  allProducts[product1].timesSeen++;
  allProducts[product2].timesSeen++;
  allProducts[product3].timesSeen++;

  //picks random product to display and checks against duplicates
  var nextProduct1 = Math.floor(Math.random() * allProducts.length);
  while((nextProduct1 === product1) || (nextProduct1 === product2) || (nextProduct1 === product3)) {
    nextProduct1 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProduct2 = Math.floor(Math.random() * allProducts.length);
  while((nextProduct2 === product1) || (nextProduct2 === product2) || (nextProduct2 === product3) || (nextProduct2 === nextProduct1)) {
    nextProduct2 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProduct3 = Math.floor(Math.random() * allProducts.length);
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

  // displaying results
  if(totalClicks === rounds) {
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
      createLI.textContent = allProducts[i].name + ' was shown ' + allProducts[i].timesSeen + ' times and received ' + allProducts[i].timesClicked + 'votes!';
      createUL.appendChild(createLI);
    }
    resultsElement.appendChild(createUL);
  }
}

for (var i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener('click', imageWasClicked);
}
