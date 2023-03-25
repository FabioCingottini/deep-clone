const {checkIsObject} = require('./checkIsObject');

describe('Test utils/checkIsObject', () => {
  it('should return true if the passed parameter is an object', () => {
    // act
    const result = checkIsObject({});

    // assert
    expect(result).toBe(true);
  });

  it('should return false if the passed parameter is an array', () => {
    // act
    const result = checkIsObject([]);

    // assert
    expect(result).toBe(false);
  });

  it('should return false if the passed parameter is null', () => {
    // act
    const result = checkIsObject(null);

    // assert
    expect(result).toBe(false);
  });

  it('should return false if the passed parameter is undefined', () => {
    // act
    const result = checkIsObject(undefined);

    // assert
    expect(result).toBe(false);
  });

  it('should return false if the passed parameter is a class', () => {
    // arrange
    const TestClass = class {
      constructor() {
        this.random = Math.random() * 100;
      }
      getRandomThing() {
        return this.random;
      }
    }

    // act
    const result = checkIsObject(new TestClass());

    // assert
    expect(result).toBe(false);
  });
});