// array representing axis and direction choices for ship generation
// [positive/negative, x/y]
const directionArray = [[1, 0], [-1, 0], [1, 1], [-1, 1]];

const shipsToFind = ['L', 'B1', 'B2', 'S'];

/**
 * Returns an object containing coordinates (x,y) key pairs of the 4 ships
 * randomly chosen, random orientation
 * @param size of board
 */
function generateShips(size) {
  let shipCoordinates = {};
  let found = false;
  for (let i = 0; i < shipsToFind.length; i++) {
    let toGenerate = true;
    while (toGenerate) {
      // pick random starting point
      const xStart = random(size - 1);
      const yStart = random(size - 1);
      const randIndex = random(directionArray.length);

      let testCoords = {};

      if (shipsToFind[i] === 'L' && !found) {
        if (generateLShip(xStart, yStart, shipCoordinates, testCoords, randIndex, size)) {
          found = true;
        }
      }

      if (shipsToFind[i] === 'B1' && !found) {
        if (generateSquareBlockShip(xStart, yStart, shipCoordinates, testCoords, randIndex, size)) {
          found = true;
        }
      }

      if (shipsToFind[i] === 'B2' && !found) {
        if (generateSquareBlockShip(xStart, yStart, shipCoordinates, testCoords, randIndex, size)) {
          found = true;
        }
      }

      if (shipsToFind[i] === 'S' && !found) {
        if (generateStraightShip(xStart, yStart, shipCoordinates, testCoords, randIndex, size)) {
          found = true;
        }
      }

      if (found) {
        Object.assign(shipCoordinates, testCoords);
        toGenerate = false;
        found = false;
      }
    }
  }
  return shipCoordinates;
}

function generateLShip(xTest, yTest, shipCoordinates, testCoords, randIndex, size) {
    let testArray = [xTest, yTest];

    let direction = directionArray[randIndex][0];
    let axis = directionArray[randIndex][1];

    for (let j = 0; j < 3; j++) {
      // if there is ship there return false
      // else record it
      if (isInvalidCoord(shipCoordinates, testArray, size)) {
        return false;
      } else {
        testCoords[`(${testArray[0]},${testArray[1]})`] = true;
        if (j + 1 !== 3) {
          testArray[axis] += direction;
        }
      }
    }
    // add protuding piece of L
    const rand = Math.round(Math.random());
    const randomDirection = rand ? direction * -1 : direction;
    // if horizontal piece, add in vertical direction and vice-versa
    if (axis) {
      testArray[0] += randomDirection;
    }
    else {
      testArray[1] += randomDirection;
    }
    if (isInvalidCoord(shipCoordinates, testArray, size)) {
      return false;
    } else {
      testCoords[`(${testArray[0]},${testArray[1]})`] = true;
    }
    return true;
}

function generateSquareBlockShip(xTest, yTest, shipCoordinates, testCoords, randIndex, size) {
  let testArrayLevelOne = [xTest, yTest];
  let testArrayLevelTwo = [xTest, yTest];

  let direction = directionArray[randIndex][0];
  let axis = directionArray[randIndex][1];

  // Increase second half of block
  if (axis) {
    testArrayLevelTwo[0] += direction;
  }
  else {
    testArrayLevelTwo[1] += direction;
  }

  for (let j = 0; j < 2; j++) {
    // if there is ship there return false
    // else record it
    if (isInvalidCoord(shipCoordinates, testArrayLevelOne, size)) {
      return false;
    } else {
      testCoords[`(${testArrayLevelOne[0]},${testArrayLevelOne[1]})`] = true;
      if (j + 1 !== 2) {
        testArrayLevelOne[axis] += direction;
      }
    }

    if (isInvalidCoord(shipCoordinates, testArrayLevelTwo, size)) {
      return false;
    } else {
      testCoords[`(${testArrayLevelTwo[0]},${testArrayLevelTwo[1]})`] = true;
      if (j + 1 !== 2) {
        testArrayLevelTwo[axis] += direction;
      }
    }
  }
  return true;
}

function generateStraightShip(xTest, yTest, shipCoordinates, testCoords, randIndex, size) {
  let testArray = [xTest, yTest];

  let direction = directionArray[randIndex][0];
  let axis = directionArray[randIndex][1];

  for (let j = 0; j < 4; j++) {
    // if there is ship there return false
    // else record it
    if (isInvalidCoord(shipCoordinates, testArray, size)) {
      return false;
    } else {
      testCoords[`(${testArray[0]},${testArray[1]})`] = true;
      if (j + 1 !== 4) {
        testArray[axis] += direction;
      }
    }
  }
  return true;
}

/**
 * check if coord is occupied by ship or out of bounds
 */
function isInvalidCoord(coordsMap, testArray, size) {
  return (coordsMap[`(${testArray[0]},${testArray[1]})`] ||
    testArray[0] > size - 1 || testArray[0] < 0 ||
    testArray[1] > size - 1 || testArray[1] < 0);
}

function random(endNumber) {
  return Math.floor(Math.random() * (endNumber));
}

export default generateShips;