# ***Booma-Package***

NPM package applies data processing on structured and unstructured data.


![NPM Version][npm-version-image]

## Installation
Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install @baiigk.mn/booma
```

## Example
```js
const {ClassWithStaticMethod} = require('@baiigk.mn/booma');

var data = [
        { id: 1, name: 'Berri Gay', gender: 'Female', age: 24 },
        { id: 2, name: 'Bianca Rathbourne', gender: 'Agender', age: 37 },
        { id: 3, name: 'Jaye Phillps', gender: 'Male', age: 48 },
        { id: 4, name: 'Lorne Ortell', gender: 'Female', age: 24 },
        { id: 5, name: 'Almire Maddock', gender: 'Female', age: 32 },
        { id: 6, name: 'Gates Cann', gender: 'Female', age: 48 },
        { id: 7, name: 'Janene Mersey', gender: 'Female', age: 26 },
        { id: 8, name: 'Towney Jerzykiewicz', gender: 'Male', age: 21 },
        { id: 9, name: 'Tiebout Glasheen', gender: 'Male', age: 24 },
        { id: 10, name: 'Yurik Morigan', gender: 'Male', age: 48 },
        { id: 11, name: 'Goldina Danielsky', gender: 'Non-binary', age: 22 },
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

## People

- The original authors of Booma are:
    - [Mohamed Salama](https://github.com/MhmdSlama)
    - [Neveen S.Nagy](https://github.com/Neveen-Samir-Nagy)


- The organization is [BAIIGK](https://github.com/BAIIGK)
