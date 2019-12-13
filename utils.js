// Fisher-Yates shuffle algorithm from https://javascript.info/task/shuffle
export function shuffle(array) {
    const newArray = [...array]; // create cloned copy, and not shallow reference

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
}
