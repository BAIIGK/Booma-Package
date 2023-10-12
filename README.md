# ***Booma***

Booma is a JavaScript library applies data management and inquiry on structured and unstructured data.


## Environment
- **NPM**: 8.1.0
- **Node**: v16.13.0

## Installation
Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install @baiigk/booma
```

## Features

Booma provides many SQL-like functionalities that can be very helpful in data processing
  * SQL-Like Syntax.
  * Filtering and Operators.
  * Sorting Criteria.
  * Grouping and Aggregates.
  * Control of Records Returned.

## Example
```js
const {ClassWithStaticMethod} = require('@baiigk.mn/booma');

var data = [
        { id: 1, name: 'Berri Gay', gender: 'Female', age: 24 },
        { id: 2, name: 'Bianca Rathbourne', gender: 'Female', age: 37 },
        { id: 3, name: 'Jaye Phillps', gender: 'Male', age: 48 },
        { id: 4, name: 'Lorne Ortell', gender: 'Female', age: 24 },
        { id: 5, name: 'Almire Maddock', gender: 'Female', age: 32 },
        { id: 6, name: 'Gates Cann', gender: 'Female', age: 48 },
        { id: 7, name: 'Janene Mersey', gender: 'Female', age: 26 },
        { id: 8, name: 'Towney Jerzykiewicz', gender: 'Male', age: 21 },
        { id: 9, name: 'Tiebout Glasheen', gender: 'Male', age: 24 },
        { id: 10, name: 'Yurik Morigan', gender: 'Male', age: 48 },
        { id: 11, name: 'Goldina Danielsky', gender: 'Female', age: 22 },
        { id: 12, name: 'Ambrosius Antoniewski', gender: 'Male', age: 50 },
        { id: 13, name: 'Aidan McNae', gender: 'Female', age: 48 },
        { id: 14, name: 'Saul Farnon', gender: 'Male', age: 31 },
        { id: 15, name: 'Hendrick Knighton', gender: 'Male', age: 28 },
        { id: 16, name: 'Osborne Greenland', gender: 'Male', age: 44 },
        { id: 17, name: 'Abbe Geram', gender: 'Female', age: 49 },
        { id: 18, name: 'Rakel Gelardi', gender: 'Female', age: 23 },
        { id: 19, name: 'Jonie Edworthy', gender: 'Female', age: 30 },
        { id: 20, name: 'Staci Newcomen', gender: 'Female', age: 30 },
        { id: 21, name: 'Ayn Tuxwell', gender: 'Female', age: 25 }
    ];

function test() {
  ClassWithStaticMethod.parse_input(
        data,
        'ARRAY_OF_OBJ'
    );

    const res = ClassWithStaticMethod.select({
        columns: ['name', 'age']
    });

    return res
}

console.log(test());
```
## Usage

First, user needs to pass the data and its type through ```parse_input``` function which will perform some initial processing on data.

There are 2 types of ```ARRAY_OF_OBJ``` like the example above or ```ARRAY_OF_ARRAY```, in this case the data should be like below
```js
var data = [
        [ "id", "name", "gender", "age" ],
        [ 2, 'Bianca Rathbourne', 'Agender', 37 ],
        [ 3, 'Jaye Phillps', 'Male', 48 ],
        [ 4, 'Lorne Ortell', 'Female', 24 ]
]
```

Then, ```select``` function can be used for inquiring, it takes an object as parameter which has all the values needed for select query like below
(Note: user doesn't need to add all the object parameters just the ones needed)
```js
    const result = ClassWithStaticMethod.select({
      columns: ['gender', 'age', 'count(id)'],
      conditions: 'age > 30',
      group_by: ['gender', 'age'],
      having: 'count(id) > 1',
      order_by: ['count(id)'],
      limit: '5',
    });
```

## People

- The original authors of Booma are:
    - [Mohamed Salama](https://github.com/MhmdSlama)
    - [Neveen S.Nagy](https://github.com/Neveen-Samir-Nagy)



