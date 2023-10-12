class ClassWithStaticMethod {
    constructor() {}
    static types = {
        ARRAY_OF_ARRAY: 1,
        ARRAY_OF_OBJ: 2,
        FILE: 3,
    };
    static AGG_FUNCS = {
        1: 'COUNT',
        2: 'SUM',
        3: 'AVG',
        4: 'MIN',
        5: 'MAX',
    };
    static objs_arr = [];
    static headers = new Set();
    
    static parse_input = (nonParsed_array, type) => {
        const key_value = (keys, values) => {
            var obj = {};
            for (let i = 0; i < keys.length; i++) {
                obj[keys[i]] = values[i];
            }
            return obj;
        };

        var objs;
        if (this.types[type] === 1) {
            this.headers.add(
                nonParsed_array[0].map((element) => {
                    return element.trim().toLowerCase();
                })
            );
            nonParsed_array.shift();
            nonParsed_array.forEach((element, index) => {
                this.objs_arr[index] = key_value(this.headers, element);
            });
        } else if (this.types[type] === 2){
            nonParsed_array.map((item) =>
                Object.keys(item).forEach(this.headers.add, this.headers)
            );
            for (head in this.headers) {
                this.headers.delete(head);
                this.headers.add(head.trim().toLowerCase());
            }
            this.objs_arr = nonParsed_array;
        }
        else {
            console.error('Not valid type');
            return;
        }

        return this.objs_arr;
    };

    static check_columnName = (columnName, table) => {
        var flag = false;
        if (table && table.length !== 0)
            table.map((element) => {
                if (
                    element.trim().toLowerCase() ===
                    columnName.trim().toLowerCase()
                ) {
                    flag = true;
                }
            });
        return flag;
    };

    static parse_columns = (columns, groupBy_arr) => {
        var obj_cols = {};
        const result = columns.map((col) => {
            const matches = col.match(/(?<=\().+?(?=\))/g);
            if (col.trim().toLowerCase().indexOf('count') !== -1) {
                if (
                    !this.check_columnName(
                        matches[0].trim().toLowerCase(),
                        Array.from(this.headers)
                    )
                ) {
                    console.error(matches[0].trim(), ' is Not a valid column');
                    return false;
                } else {
                    obj_cols[this.AGG_FUNCS[1]] = [
                        matches[0].trim().toLowerCase(),
                        col.trim(),
                    ];
                }
            } else if (col.trim().toLowerCase().indexOf('sum') !== -1) {
                if (
                    !this.check_columnName(
                        matches[0].trim().toLowerCase(),
                        Array.from(this.headers)
                    )
                ) {
                    console.error(matches[0].trim(), ' is Not a valid column');
                    return false;
                } else {
                    obj_cols[this.AGG_FUNCS[2]] = [
                        matches[0].trim().toLowerCase(),
                        col.trim(),
                    ];
                }
            } else if (col.trim().toLowerCase().indexOf('avg') !== -1) {
                if (
                    !this.check_columnName(
                        matches[0].trim().toLowerCase(),
                        Array.from(this.headers)
                    )
                ) {
                    console.error(matches[0].trim(), ' is Not a valid column');
                    return false;
                } else {
                    obj_cols[this.AGG_FUNCS[3]] = [
                        matches[0].trim().toLowerCase(),
                        col.trim(),
                    ];
                }
            } else if (col.trim().toLowerCase().indexOf('min') !== -1) {
                if (
                    !this.check_columnName(
                        matches[0].trim().toLowerCase(),
                        Array.from(this.headers)
                    )
                ) {
                    console.error(matches[0].trim(), ' is Not a valid column');
                    return false;
                } else {
                    obj_cols[this.AGG_FUNCS[4]] = [
                        matches[0].trim().toLowerCase(),
                        col.trim(),
                    ];
                }
            } else if (col.trim().toLowerCase().indexOf('max') !== -1) {
                if (
                    !this.check_columnName(
                        matches[0].trim().toLowerCase(),
                        Array.from(this.headers)
                    )
                ) {
                    console.error(matches[0].trim(), ' is Not a valid column');
                    return false;
                } else {
                    obj_cols[this.AGG_FUNCS[5]] = [
                        matches[0].trim().toLowerCase(),
                        col.trim(),
                    ];
                }
            } else {
                if (
                    !this.check_columnName(
                        col.trim().toLowerCase(),
                        groupBy_arr
                    )
                ) {
                    console.error(col.trim(), ' is Not a valid column');
                    return false;
                } else {
                    obj_cols[col.trim().toLowerCase()] = [
                        col.trim().toLowerCase(),
                    ];
                }
            }
        });
        return result.indexOf(false) !== -1 ? false : obj_cols;
    };

    static select_columns = (columns, table) => {
        var result = [];
        if (
            !columns ||
            columns.length === 0 ||
            (columns.length === 1 && columns[0] === '*')
        ) {
            columns = Array.from(this.headers);
        }
        table.map((elem, index) => {
            result[index] = {};
            columns.map((col) => {
                result[index][col.trim()] = elem[col.trim()];
            });
        });
        return result;
    };

    static parse_groupBy_columns = (record, columns_objs, groupBy_obj) => {
        !groupBy_obj['LENGTH']
            ? (groupBy_obj['LENGTH'] = 1)
            : (groupBy_obj['LENGTH'] += 1);
        for (let key in columns_objs) {
            if (key === this.AGG_FUNCS[1]) {
                !groupBy_obj[columns_objs[key][1]]
                    ? (groupBy_obj[columns_objs[key][1]] = 1)
                    : (groupBy_obj[columns_objs[key][1]] += 1);
            } else if (key === this.AGG_FUNCS[2]) {
                !groupBy_obj[columns_objs[key][1]]
                    ? (groupBy_obj[columns_objs[key][1]] =
                          record[columns_objs[key][0]])
                    : (groupBy_obj[columns_objs[key][1]] +=
                          record[columns_objs[key][0]]);
            } else if (key === this.AGG_FUNCS[3]) {
                !groupBy_obj[columns_objs[key][1]]
                    ? (groupBy_obj[columns_objs[key][1]] =
                          record[columns_objs[key][0]])
                    : (groupBy_obj[columns_objs[key][1]] +=
                          record[columns_objs[key][0]]);
            } else if (key === this.AGG_FUNCS[4]) {
                groupBy_obj[columns_objs[key][1]]
                    ? groupBy_obj[columns_objs[key][1]] >
                      record[columns_objs[key][0]]
                        ? record[columns_objs[key][0]]
                        : groupBy_obj[columns_objs[key][1]]
                    : record[columns_objs[key][0]];
            } else if (key === this.AGG_FUNCS[5]) {
                groupBy_obj[columns_objs[key][1]]
                    ? groupBy_obj[columns_objs[key][1]] <
                      record[columns_objs[key][0]]
                        ? record[columns_objs[key][0]]
                        : groupBy_obj[columns_objs[key][1]]
                    : record[columns_objs[key][0]];
            } else {
                !groupBy_obj[columns_objs[key][1]]
                    ? (groupBy_obj[columns_objs[key][0]] =
                          record[columns_objs[key][0]])
                    : (groupBy_obj[columns_objs[key][1]] =
                          groupBy_obj[columns_objs[key][1]]);
            }
        }
    };

    static customSort = (arr, attributes) => {
        return arr.slice().sort((a, b) => {
            for (let attribute_dir of attributes) {
                const [attribute, dir] = attribute_dir
                    .trim()
                    .replace(/\s+/g, ' ')
                    .split(' ');

                const aValue = a[attribute];
                const bValue = b[attribute];

                if (!aValue || aValue < bValue) {
                    return dir && dir.toLowerCase() === 'desc' ? 1 : -1;
                } else if (!bValue || aValue > bValue) {
                    return dir && dir.toLowerCase() === 'desc' ? -1 : 1;
                }
            }
            return 0;
        });
    };

    static conditions_having = (main_array, conditions, columns) => {
        const customFilters = conditions
            ? new Function(
                  'item',
                  `const { ${columns
                      .join()
                      .replace(/(count|sum)\((\w+)\)/g, '$1_$2')} } = item;
            return ${
                conditions
                .replace(/(^|[^><=!])=/g, '$1==')
                .replace(/(count|sum)\((\w+)\)/g, '$1_$2')
                .replace(/like (\w+)/g, '.indexOf(\'$1\') !== -1')
            };`
              )
            : () => true;

        return main_array.filter((item) => {
            let newItem = {};
            Object.keys(item).map(
                (key) =>
                    (newItem[key.replace(/(count|sum)\((\w+)\)/g, '$1_$2')] =
                        item[key])
            );
            return customFilters(newItem);
        });
    };

    static select = (sql_objs = {}) => {
        if(this.objs_arr.length === 0 || !this.objs_arr){
            return;
        }
        var { columns, conditions, group_by, having, order_by, limit } =
            sql_objs;

        var result = [];
        var distinctCombinations = {};

        //Conditions
        if (conditions && conditions.length !== 0) {
            result = this.conditions_having(
                this.objs_arr,
                conditions,
                Array.from(this.headers)
            );
        } else {
            result = this.objs_arr;
        }

        
        //Group By
        if (group_by && group_by.length !== 0) {
            const includesAll = group_by.every((item) =>
                this.headers.has(item.trim().toLowerCase())
            );
            if (!includesAll) {
                console.error('Some Columns are not valid');
                return;
            }
            var column_objs = this.parse_columns(columns, group_by);
            if (column_objs === false) {
                console.error('Some Columns are not valid');
                return;
            }

            result.map((obj) => {
                let v = '';
                group_by.map((col, index) => {
                    index !== group_by.length - 1
                        ? (v += `${obj[col.trim()]}-`)
                        : (v += `${obj[col.trim()]}`);
                });
                !distinctCombinations[v]
                    ? (distinctCombinations[v] = {})
                    : null;
                this.parse_groupBy_columns(
                    obj,
                    column_objs,
                    distinctCombinations[v]
                );
            });
            // distinctCombinations = distinctCombinations.map((combination) => {
            //     return combination.split('-');
            // });
        }


        //Columns
        if (Object.keys(distinctCombinations).length !== 0) {
            result = Object.values(distinctCombinations);
            result.map((elem) => {
                column_objs.AVG
                    ? (elem[column_objs.AVG[1]] = parseFloat(
                          elem[column_objs.AVG[1]] / elem.LENGTH
                      ))
                    : null;
                delete elem.LENGTH;
            });
            if (having && having.length !== 0) {
                result = this.conditions_having(result, having, columns);
            }
        } else {
            result = this.select_columns(columns, result);
        }

        if (order_by && order_by.length !== 0) {
            result = this.customSort(result, order_by);
        }


        //Limit
        if (limit && parseInt(limit)) {
            result.splice(limit);
        }

        return result;
    };
}

module.exports = {ClassWithStaticMethod};

// ClassWithStaticMethod.parse_input(
//     [
//         { id: 1, name: 'Berri Gay', gender: 'Female', age: 24 },
//         { id: 2, name: 'Bianca Rathbourne', gender: 'Agender', age: 37 },
//         { id: 3, name: 'Jaye Phillps', gender: 'Male', age: 48 },
//         { id: 4, name: 'Lorne Ortell', gender: 'Female', age: 24 },
//         { id: 5, name: 'Almire Maddock', gender: 'Female', age: 32 },
//         { id: 6, name: 'Gates Cann', gender: 'Female', age: 48 },
//         { id: 7, name: 'Janene Mersey', gender: 'Female', age: 26 },
//         { id: 8, name: 'Towney Jerzykiewicz', gender: 'Male', age: 21 },
//         { id: 9, name: 'Tiebout Glasheen', gender: 'Male', age: 24 },
//         { id: 10, name: 'Yurik Morigan', gender: 'Male', age: 48 },
//         { id: 11, name: 'Goldina Danielsky', gender: 'Non-binary', age: 22 },
//         { id: 12, name: 'Ambrosius Antoniewski', gender: 'Male', age: 50 },
//         { id: 13, name: 'Aidan McNae', gender: 'Female', age: 48 },
//         { id: 14, name: 'Saul Farnon', gender: 'Male', age: 31 },
//         { id: 15, name: 'Hendrick Knighton', gender: 'Male', age: 28 },
//         { id: 16, name: 'Osborne Greenland', gender: 'Male', age: 44 },
//         { id: 17, name: 'Abbe Geram', gender: 'Female', age: 49 },
//         { id: 18, name: 'Rakel Gelardi', gender: 'Female', age: 23 },
//         { id: 19, name: 'Jonie Edworthy', gender: 'Female', age: 30 },
//         { id: 20, name: 'Staci Newcomen', gender: 'Female', age: 30 },
//         { id: 21, name: 'Ayn Tuxwell', gender: 'Female', age: 25 },
//         {
//             id: 22,
//             name: 'Lambert Simononsky',
//             gender: 'Genderqueer',
//             age: 21,
//         },
//         { id: 23, name: 'Zelma Ligoe', gender: 'Bigender', age: 30 },
//         { id: 24, name: 'Anatole Broad', gender: 'Male', age: 20 },
//         { id: 25, name: 'Franklyn Friedenbach', gender: 'Male', age: 43 },
//         { id: 26, name: "Shane O'Henery", gender: 'Male', age: 29 },
//         { id: 27, name: 'Ivette Telford', gender: 'Female', age: 32 },
//         { id: 28, name: 'Philis Streatfeild', gender: 'Female', age: 43 },
//         { id: 29, name: 'Olav Kellard', gender: 'Male', age: 24 },
//         { id: 30, name: 'Rosamund McErlaine', gender: 'Female', age: 35 },
//         { id: 31, name: 'Stillman Mostyn', gender: 'Male', age: 49 },
//         { id: 32, name: 'Kale Spread', gender: 'Male', age: 31 },
//         { id: 33, name: 'Concordia Revely', gender: 'Female', age: 39 },
//         { id: 34, name: 'Arie Balsellie', gender: 'Bigender', age: 44 },
//         { id: 35, name: 'Elianora Float', gender: 'Female', age: 38 },
//         { id: 36, name: 'Erny Trahar', gender: 'Male', age: 22 },
//         { id: 37, name: 'Farris Shout', gender: 'Male', age: 34 },
//         { id: 38, name: 'Sauveur Langsbury', gender: 'Male', age: 43 },
//         { id: 39, name: 'Brig Kearton', gender: 'Male', age: 31 },
//         { id: 40, name: 'Kirstyn Hatje', gender: 'Female', age: 25 },
//         { id: 41, name: 'Lazare Denley', gender: 'Male', age: 21 },
//         { id: 42, name: 'Waiter Braidon', gender: 'Male', age: 50 },
//         { id: 43, name: 'Whitney Basill', gender: 'Male', age: 34 },
//         { id: 44, name: 'Joey Hendrichs', gender: 'Male', age: 42 },
//         { id: 45, name: 'Jude Jennaroy', gender: 'Male', age: 36 },
//         { id: 46, name: 'Alphard Shawcroft', gender: 'Male', age: 41 },
//         { id: 47, name: 'Herculie Thornthwaite', gender: 'Male', age: 39 },
//         { id: 48, name: 'Mandi Doige', gender: 'Female', age: 20 },
//         { id: 49, name: 'Waylen Rodliff', gender: 'Male', age: 39 },
//         { id: 50, name: 'Zollie Wickenden', gender: 'Male', age: 29 },
//         { id: 51, name: 'Alfonso Billyeald', gender: 'Male', age: 24 },
//         { id: 52, name: 'Merrel Eam', gender: 'Male', age: 44 },
//         { id: 53, name: 'Isaiah Haseman', gender: 'Male', age: 39 },
//         { id: 54, name: 'Kennith Lohan', gender: 'Male', age: 26 },
//         { id: 55, name: 'Langsdon Dillinton', gender: 'Male', age: 29 },
//         { id: 56, name: 'Derrik Smails', gender: 'Male', age: 20 },
//         { id: 57, name: 'Tadio Bwye', gender: 'Male', age: 46 },
//         { id: 58, name: 'Gabriell Firbank', gender: 'Female', age: 20 },
//         { id: 59, name: 'Garvy Lorentzen', gender: 'Male', age: 30 },
//         { id: 60, name: 'Moise Gilardengo', gender: 'Male', age: 32 },
//         { id: 61, name: 'Theresita Bedding', gender: 'Female', age: 46 },
//         { id: 62, name: 'Tamarah Purches', gender: 'Female', age: 35 },
//         { id: 63, name: 'Emiline Feitosa', gender: 'Female', age: 29 },
//         { id: 64, name: 'Heddie Woodcock', gender: 'Bigender', age: 48 },
//         { id: 65, name: 'Moss Eary', gender: 'Male', age: 33 },
//         { id: 66, name: 'Shea Barock', gender: 'Female', age: 31 },
//         { id: 67, name: 'Moritz Martinello', gender: 'Male', age: 30 },
//         { id: 68, name: 'Bernette Millican', gender: 'Female', age: 38 },
//         { id: 69, name: 'Irwinn Oleshunin', gender: 'Male', age: 45 },
//         { id: 70, name: 'Kerwin Bourdon', gender: 'Male', age: 38 },
//         { id: 71, name: 'Gerome Boxen', gender: 'Male', age: 25 },
//         { id: 72, name: 'Boonie Durran', gender: 'Male', age: 31 },
//         { id: 73, name: 'Torey Brandel', gender: 'Female', age: 34 },
//         { id: 74, name: 'Wini Croasdale', gender: 'Female', age: 25 },
//         { id: 75, name: 'Jilli Forde', gender: 'Female', age: 26 },
//         { id: 76, name: 'Chester Bennike', gender: 'Male', age: 46 },
//         { id: 77, name: 'Gabriello Ingarfill', gender: 'Male', age: 50 },
//         { id: 78, name: 'Isis Worssam', gender: 'Female', age: 40 },
//         { id: 79, name: 'Devonne Salzburger', gender: 'Female', age: 37 },
//         { id: 80, name: 'Barthel McOrkill', gender: 'Male', age: 28 },
//         { id: 81, name: 'Gale Cleaton', gender: 'Female', age: 45 },
//         { id: 82, name: 'Pail Pepis', gender: 'Male', age: 27 },
//         { id: 83, name: 'Jeannie Waszkiewicz', gender: 'Female', age: 49 },
//         { id: 84, name: 'Dolly Espinos', gender: 'Female', age: 29 },
//         { id: 85, name: 'Harwilll Barbe', gender: 'Male', age: 42 },
//         { id: 86, name: 'Torin Darrel', gender: 'Male', age: 42 },
//         { id: 87, name: 'Philly Ziehm', gender: 'Female', age: 49 },
//         { id: 88, name: 'Nikolas Ferschke', gender: 'Male', age: 33 },
//         { id: 89, name: 'Linea Callery', gender: 'Female', age: 32 },
//         { id: 90, name: 'Abdel Mayler', gender: 'Male', age: 21 },
//         { id: 91, name: 'Lynsey Orlton', gender: 'Female', age: 44 },
//         { id: 92, name: 'Karoly Iddon', gender: 'Male', age: 37 },
//         { id: 93, name: 'Otto Healks', gender: 'Genderfluid', age: 50 },
//         { id: 94, name: 'Shanie Salvadore', gender: 'Polygender', age: 26 },
//         { id: 95, name: 'Vasilis Itschakov', gender: 'Male', age: 39 },
//         { id: 96, name: 'Hans Hubbins', gender: 'Male', age: 20 },
//         { id: 97, name: 'Katlin Core', gender: 'Female', age: 31 },
//         { id: 98, name: 'Blondell Haselden', gender: 'Polygender', age: 42 },
//         { id: 99, name: 'Davy McTrustam', gender: 'Male', age: 44 },
//         { id: 100, name: 'Calvin Wrightem', gender: 'Non-binary', age: 44 },
//     ],
//     'ARRAY_OF_OBJ'
// );

// console.log(
//     ClassWithStaticMethod.select({
//         columns: ['age   ', 'sum(id)'],
//         conditions: 'age > 30',
//         group_by: [' age'],
//         having: 'sum(id) > 220',
//         order_by: ['age pla','sum(id) desc'],
//         limit: 'n',
//     })
// );
