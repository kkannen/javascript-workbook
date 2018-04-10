'use strict';

const assert = require('assert');

//FOR EACH FUNCTION
const forEach = (arr, callback) => {
  for(let x = 0; x < arr.length; x++){
    callback(arr[x])
  }
}

//MAP FUNCTION
const map = (arr, callback) => {
  const mappedArr=[];
  for (let x = 0; x < arr.length; x++){
    mappedArr.push(callback(arr[x]))
  }
  return mappedArr
}

//FILTER FUNCTION
const filter = (arr, callback) => {
  const filteredArr = [];
  for (let x = 0; x < arr.length; x++){
    if (callback(arr[x])) {
      filteredArr.push(arr[x])
    }
  }
  return filteredArr
}

//SOME FUNCTION
const some = (arr, callback) => {
  for (let x = 0; x < arr.length; x++){
    if(callback(arr[x])){
      return true
    }
  }
  return false
}

//EVERY FUNCTION
const every = (arr, callback) => {
  for (let x = 0; x < arr.length; x++){
    if(!callback(arr[x])){
      return false;
    }
  }
  return true;
}

//TESTS
if (typeof describe === 'function') {

  describe('#forEach()', () => {
    it('should call the callback the array.length number of times', () => {
      let count = 0;
      forEach([1, 2, 3], () => {
        count++;
      });
      assert.equal(count, 3);
    });
  });

  describe('#map()', () => {
    const arr = [1, 2, 3];
    const mapped = map(arr, (num) => {
      return num * num;
    });
    it('should return new array with mapped items', () => {
      assert.deepEqual(mapped, [1, 4, 9]);
    });
    it('should not affect the original array', () => {
      assert.deepEqual(arr, [1, 2, 3]);
    })
  });

  describe('#filter()', () => {
    it('should return an array of items that pass the predicate test', () => {
      const filtered = filter([1, 2, 3], (num) => {
        return num % 2 === 0;
      });
      assert.deepEqual(filtered, [2]);
    });
  });

  describe('#some()', () => {
    let count = 0;
    const somed = some([1, 2, 3, 4], (num) => {
      count++;
      return num % 2 === 0;
    });
    it('should return true if at least one item passes the predicate test', () => {
      assert.equal(somed, true);
    });
    it('should stop at the first item that passes the predicate test', () => {
      assert.equal(count, 2);
    });
    it('should return false if no items pass the predicate test', () => {
      const somed = some([1, 3, 5], (num) => {
        return num % 2 === 0;
      });
      assert.equal(somed, false);
    });
  });

  describe('#every()', () => {
    it('should return true if at all passes the predicate test', () => {
      const everied = every([2, 4, 6], (num) => {
        return num % 2 === 0;
      });
      assert.equal(everied, true);
    });
    let count = 0;
    const everied = every([2, 3, 4, 5], (num) => {
      count++;
      return num % 2 === 0;
    });
    it('should return false if any item fails the predicate test', () => {
      assert.equal(everied, false);
    });
    it('should stop at the first item that fails the predicate test', () => {
      assert.equal(count, 2);
    });
  });

} else {

  console.log('Only run the tests on this one!')

}
