interface Person {
    name: string;
    age: number;
}

function sortByName(a: Person[]) {
    var result = a.slice(0);
    result.sort((x, y) => {
        return x.name.localeCompare(y.name);
    });
    return result;
}
//export let something = 123;

sortByName([]);
console.log("hi there4");