let myGridSize = prompt('De que tamaño te gustaria tu zona');
let enemyGridSize = prompt('De que tamaño es la zona del enemigo');
let myGrid = createGrid(myGridSize);
let enemyGrid = createGrid(enemyGridSize);
let myShips = 3;
let enemyShips = 3;
let enemyLocations = {};

printGrid(enemyGrid, true);
printGrid(myGrid);

//game setup
for (let i = 1; i < 4; i++) {
  let x = prompt('Ingrese X para su Coordenada de Ataque ' + i);
  let y = prompt('Ingrese Y para su Coordenada de Nave ' + i);
  placeCharacter(x, y, 'O', myGrid);
  placeRandomCharacter('O', enemyGrid, enemyGridSize);
  drawBreak();
  printGrid(enemyGrid, true);
  printGrid(myGrid);
}

while (enemyShips > 0 && myShips > 0) {
  let x = prompt('Ingrese la coordenada X para atacar');
  let y = prompt('Ingrese la coordenada Y para atacar');

  if (attack(x, y, enemyGrid)) {
    enemyShips--;
  }

  x = getRandomInt(myGridSize);
  y = getRandomInt(myGridSize);
  if (enemyShips > 0 && attack(x, y, myGrid)) {
    myShips--;
  }

  drawBreak();
  printGrid(enemyGrid, true);
  printGrid(myGrid);
}

if (myShips < enemyShips) {
  console.log('Perdiste!');
} else {
  console.log('Ganaste!!');
}

function createGrid(size) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = '-';
    }
  }
  return grid;
}

function printGrid(grid, isEnemy = false) {
  const headers = createHeaders(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    let rowStr = i + ' ';
    for (let cell of grid[i]) {
      if (isEnemy && cell == 'O') {
        rowStr += '- ';
      } else {
        rowStr += cell + ' ';
      }
    }
    console.log(rowStr);
  }
}

function createHeaders(size) {
  let result = '  ';
  for (let i = 0; i < size; i++) {
    result += i + ' ';
  }
  return result;
}

function placeCharacter(x, y, c, grid) {
  grid[y][x] = c;
}

function placeRandomCharacter(c, grid, max) {
  let didPlace = false;
  while (!didPlace) {
    let x = getRandomInt(max);
    let y = getRandomInt(max);
    if (!enemyLocations[`${x}-${y}`]) {
      placeCharacter(x, y, c, grid);
      didPlace = true;
      enemyLocations[`${x}-${y}`] = true;
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function attack(x, y, grid) {
  if (grid[y][x] == 'O') {
    grid[y][x] = '!';
    return true;
  } else if (grid[y][x] == '-') {
    grid[y][x] = 'x';
    return false;
  } else {
    return false;
  }
}

function drawBreak() {
  console.log('---------------------------------');
}