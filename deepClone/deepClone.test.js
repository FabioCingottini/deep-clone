const {deepClone} = require("./deepClone");

describe("Test deepClone", () => {
  it("should clone an object", () => {
    // arrange
    const objectToClone = {
      a: 1,
    }

    // act
    const clonedObject = deepClone(objectToClone);

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject).not.toBe(objectToClone);
  });

  it("should clone an array", () => {
    // arrange
    const arrayToClone = [1, 2, 3];

    // act
    const clonedArray = deepClone(arrayToClone);

    // assert
    expect(clonedArray).toEqual(arrayToClone);
    expect(clonedArray).not.toBe(arrayToClone);
  });

  it("should clone an object with an array", () => {
    // arrange
    const objectToClone = {
      a: [1, 2, 3],
    };

    // act
    const clonedObject = deepClone(objectToClone);

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);

  });

  it("should clone an array with an object", () => {
    // arrange
    const arrayToClone = [
      {
        a: 1,
      }
    ];

    // act
    const clonedArray = deepClone(arrayToClone);

    // assert
    expect(clonedArray).toEqual(arrayToClone);
    expect(clonedArray[0]).not.toBe(arrayToClone[0]);
  });

  it("should clone an object with an object", () => {
    // arrange
    const objectToClone = {
      a: {
        b: 1,
      }
    }

    // act
    const clonedObject = deepClone(objectToClone);

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);
    expect(clonedObject.a.b).toBe(objectToClone.a.b);
  });

  it("should clone an array with an array", () => {
    // arrange
    const arrayToClone = [
      [1, 2, 3],
    ];

    // act
    const clonedArray = deepClone(arrayToClone);

    // assert
    expect(clonedArray).toEqual(arrayToClone);
    expect(clonedArray[0]).not.toBe(arrayToClone[0]);
  });

  it("should clone an object with an object with an array with an object", () => {
    // arrange
    const objectToClone = {
      a: {
        b: [
          {
            c: 1,
          }
        ]
      }
    };

    // act
    const clonedObject = deepClone(objectToClone);

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);
    expect(clonedObject.a.b).not.toBe(objectToClone.a.b);
    expect(clonedObject.a.b[0]).not.toBe(objectToClone.a.b[0]);
    expect(clonedObject.a.b[0].c).toBe(objectToClone.a.b[0].c);
  });

  it("should clone an object with an object with an array with an object with an array with an object", () => {
    // arrange
    const objectToClone = {
      a: {
        b: [
          {
            c: [
              {
                d: 1,
              }
            ]
          }
        ]
      }
    }

    // act
    const clonedObject = deepClone(objectToClone);

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);
    expect(clonedObject.a.b).not.toBe(objectToClone.a.b);
    expect(clonedObject.a.b[0]).not.toBe(objectToClone.a.b[0]);
    expect(clonedObject.a.b[0].c).not.toBe(objectToClone.a.b[0].c);
    expect(clonedObject.a.b[0].c[0]).not.toBe(objectToClone.a.b[0].c[0]);
    expect(clonedObject.a.b[0].c[0].d).toBe(objectToClone.a.b[0].c[0].d);
  });

  it("should clone an object with a non native type and a custom clone function", () => {
    // arrange
    const objectToClone = {
      a: new Date(),
    }

    // act
    const clonedObject = deepClone(objectToClone, (value) => {
      if (value instanceof Date) {
        return new Date(value.getTime());
      }
    });

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);
  });

  it("should clone an object with an array with a non native type and a custom clone function", () => {
    // arrange
    const objectToClone = {
      a: [
        new Date(),
      ]
    }

    // act
    const clonedObject = deepClone(objectToClone, (value) => {
      if (value instanceof Date) {
        return new Date(value.getTime());
      }
    });

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);
    expect(clonedObject.a[0]).not.toBe(objectToClone.a[0]);
  });

  it("should clone an object with an array with an object with a non native type and a custom clone function", () => {
    // arrange
    const objectToClone = {
      a: [
        {
          b: new Date(),
        }
      ]
    }

    // act
    const clonedObject = deepClone(objectToClone, (value) => {
      if (value instanceof Date) {
        return new Date(value.getTime());
      }
    });

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);
    expect(clonedObject.a[0]).not.toBe(objectToClone.a[0]);
    expect(clonedObject.a[0].b).not.toBe(objectToClone.a[0].b);
  });

  it("should clone an object with an array with an object with an array with an object with a non native type and a custom clone function", () => {
    // arrange
    const objectToClone = {
      a: [
        {
          b: [
            {
              c: new Date(),
            }
          ]
        }
      ]
    }

    // act
    const clonedObject = deepClone(objectToClone, (value) => {
      if (value instanceof Date) {
        return new Date(value.getTime());
      }
    });

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);
    expect(clonedObject.a[0]).not.toBe(objectToClone.a[0]);
    expect(clonedObject.a[0].b).not.toBe(objectToClone.a[0].b);
    expect(clonedObject.a[0].b[0]).not.toBe(objectToClone.a[0].b[0]);
    expect(clonedObject.a[0].b[0].c).not.toBe(objectToClone.a[0].b[0].c);
  });

  it("should clone an object with an array with an object with an array with an object with an array with an object with a non native type and a custom clone function", () => {
    // arrange
    const objectToClone = {
      a: [
        {
          b: [
            {
              c: [
                {
                  d: new Date(),
                }
              ]
            }
          ]
        }
      ]
    }

    // act
    const clonedObject = deepClone(objectToClone, (value) => {
      if (value instanceof Date) {
        return new Date(value.getTime());
      }
    });

    // assert
    expect(clonedObject).toEqual(objectToClone);
    expect(clonedObject.a).not.toBe(objectToClone.a);
    expect(clonedObject.a[0]).not.toBe(objectToClone.a[0]);
    expect(clonedObject.a[0].b).not.toBe(objectToClone.a[0].b);
    expect(clonedObject.a[0].b[0]).not.toBe(objectToClone.a[0].b[0]);
    expect(clonedObject.a[0].b[0].c).not.toBe(objectToClone.a[0].b[0].c);
    expect(clonedObject.a[0].b[0].c[0]).not.toBe(objectToClone.a[0].b[0].c[0]);
    expect(clonedObject.a[0].b[0].c[0].d).not.toBe(objectToClone.a[0].b[0].c[0].d);
  });

  it("should throw an error when there is a non native type and no custom clone function", () => {
    // arrange
    const objectToClone = {
      a: new Date(),
    }

    // act
    const act = () => deepClone(objectToClone);

    // assert
    expect(act).toThrowError();
  });

  it("should throw an error when there is an array with a non native type and no custom clone function", () => {
    // arrange
    const objectToClone = {
      a: [
        new Date(),
      ]
    }

    // act
    const act = () => deepClone(objectToClone);

    // assert
    expect(act).toThrowError();
  });

  it("should throw an error when there is an array with an object with a non native type and no custom clone function", () => {
    // arrange
    const objectToClone = {
      a: [
        {
          b: new Date(),
        }
      ]
    }

    // act
    const act = () => deepClone(objectToClone);

    // assert
    expect(act).toThrowError();
  });

  it("should throw an error when there is an array with an object with an array with an object with a non native type and no custom clone function", () => {
    // arrange
    const objectToClone = {
      a: [
        {
          b: [
            {
              c: new Date(),
            }
          ]
        }
      ]
    }

    // act
    const act = () => deepClone(objectToClone);

    // assert
    expect(act).toThrowError();
  });

  it("should throw an error when there is an array with an object with an array with an object with an array with an object with a non native type and no custom clone function", () => {
    // arrange
    const objectToClone = {
      a: [
        {
          b: [
            {
              c: [
                {
                  d: new Date(),
                }
              ]
            }
          ]
        }
      ]
    }

    // act
    const act = () => deepClone(objectToClone);

    // assert
    expect(act).toThrowError();
  });
});