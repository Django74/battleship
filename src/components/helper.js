// array representing axis and direction choices for ship generation
// [positive/negative, x/y]
const directionArray = [[1, 0], [-1, 0], [1, 1], [-1, 1]];

function generateShips(size) {
  let toGenerate = true;
  let shipCoordinates = {};
  while (toGenerate) {
    // pick random starting point
    const xStart = Math.floor((Math.random() * (size - 1)));
    const yStart = Math.floor((Math.random() * (size - 1)));
    const randIndex = Math.floor(Math.random() * (directionArray.length));

    let found = false;
    while (!found) {
      let xTest = xStart;
      let yTest = yStart;
      let coord = `(${xTest},${yTest})`; // (x,y) format

      let testArray = [xTest, yTest];

      // L ship
      let direction = directionArray[randIndex][0];
      let axis = directionArray[randIndex][1];

      let testCoords = {};

      for (let i = 0; i < 3; i++) {
        // if there is ship there, break and check next
        // else record it
        if (isOccupied(shipCoordinates, testArray, axis, size)) {
          break;
        } else {
          testCoords[`(${testArray[0]},${testArray[1]})`] = true;
          if (i + 1 !== 3) testArray[axis] += direction;
        }
      }
      // add protuding piece of L
      const rand = Math.round(Math.random());
      const randomDirection = rand ? direction * -1 : direction;
      // if horizontal piece, add in vertical direction and vice-versa
      let newAxis;
      if (axis) {
        testArray[0] += randomDirection;
        newAxis = 0;
      }
      else {
        testArray[1] += randomDirection;
        newAxis = 1;
      }
      if (isOccupied(shipCoordinates, testArray, axis, size)){
        break;
      } else {
        testCoords[`(${testArray[0]},${testArray[1]})`] = true;
        found = true;
      }
      if (found) {
        Object.assign(shipCoordinates, testCoords);
        toGenerate = false;
      }
    }
  }
  return shipCoordinates;
}

// check if space is occupied by ship or coords is out of bounds
function isOccupied(coordsMap, testCoords, axis, size) {
  return  (coordsMap[`(${testCoords[0]},${testCoords[1]}`] ||
    testCoords[0] > size - 1 || testCoords[0] < 0 ||
    testCoords[1] > size - 1 || testCoords[1] < 0)
}

export default generateShips;