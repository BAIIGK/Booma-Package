
const objs_arr = [];
const parse_input = (nonParsed_array, type) => {
    console.log('NonParsed array:');
    console.log(nonParsed_array);
    const key_value = (keys, values) => {
        var obj = {};
        for (let i = 0; i < keys.length; i++){
            obj[keys[i]] = values[i];
        }
        return obj;
    }
    
    var objs;
    if (types[type] === 1) {
        const keys = nonParsed_array[0];
        nonParsed_array.shift();
        nonParsed_array.forEach((element, index) => {
            objs_arr[index] = key_value(keys, element);
        });
    }
    else {
        objs_arr = nonParsed_array;
    }
    console.log('Parsed array:');
    return objs_arr;
};

const select = () => {
    const all = () => {
        return objs_arr;
    }
}

const types = {
    ARRAY_OF_ARRAY: 1,
    ARRAY_OF_OBJ: 2,
};

exports.modules = {parse_input, select};
