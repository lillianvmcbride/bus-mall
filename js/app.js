'use strict';

let allProducts = [];

function Product(name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0 ;
  allProducts.push(this);
}

new Product('Bag', 'images/bag.jpg');
new Product('Banana Slicer', 'images/banana.jpg');
new Product('Tablet Stand', 'images/bathroom.jpg');
new Product('Toeless Boots', 'images/boots.jpg');
new Product('Breakfast Maker', 'images/breakfast.jpg');
new Product('Meatball Bubble Gum', 'images/bubblegum.jpg');
new Product('Chair', 'images/chair.jpg');
new Product('Cthulhu', 'images/cthulhu.jpg');
new Product('Duck Muzzle', 'images/dog-duck.jpg');
new Product('Dragon Meat', 'images/dragon.jpg');
new Product('Pen Silverware', 'images/pen.jpg');
new Product('Pet Sweeper', 'images/pet-sweep.jpg');
new Product('Pizza Scissors', 'images/scissors.jpg');
new Product('Shark Sleeping Bag', 'images/shark.jpg');
new Product('Baby Sweeper', 'images/sweep.png');
new Product('Tauntain Sleeping Bag', 'images/tauntaun.jpg');
new Product('Unicorn Meat', 'images/unicorn.jpg');
new Product('Watering Can', 'images/water-can.jpg');
new Product('Wine Glass', 'images/wine-glass.jpg');
