// Fisher-Yates shuffle algorithm from https://javascript.info/task/shuffle
export function shuffle(array) {
    console.log("START Fisher-Yates shuffle array...");
    let newArray = [...array]; // create cloned copy like array.slice(), and not shallow reference

    for (let i = newArray.length - 1; i > 0; i--) {
        //console.log("i", i);
        let j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    console.log("END Fisher-Yates shuffle array.");
    return newArray;
}

/*
const shuffle = (array) => {
    let newArray = [...array]; // array.slice()

    for (let i = newArray.length - 1; i > 0; i--) {
        //console.log("i", i);
        let j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    
    return newArray;
}
*/

/*
const shuffle = (array) => {
    let newArray = array;

    for (let i = newArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    
    return newArray;
}
*/

/*
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
*/

/*
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
*/