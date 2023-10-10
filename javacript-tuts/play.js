const person = {
    name: "John",
    age: 30,
    greet() {
        console.log("Hi, I am " + this.name);
    }
};


const printName = (person) => {
    console.log(person.name);
}

printName(person); // John

// object destructuring

const printName1 = ({ name }) => {
    console.log(name);
}

printName1(person); // John

const { name, age } = person;
console.log(name, age); // John 30

const hobbies = ['Sports', 'Cooking'];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2); // Sports Cooking


// const copiedPerson = {...person};
// console.log(copiedPerson);
// // { name: 'John', age: 30, greet: [Function: greet] }


// person.greet();


// const hobbies = ['Sports', 'Cooking'];
// for (let hobby of hobbies) {
//     console.log(hobby);
// }

// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));

// console.log(hobbies);

// hobbies.push('Programming');

// console.log(hobbies); // hobbies is a constant but we can still push to it because we are not changing the pointer to the array, we are just changing the array itself

// const copiedArray = hobbies.slice(); // slice() copies the array
// console.log(copiedArray);   // copiedArray is a copy of hobbies but it is not the same array
// // [ 'Sports', 'Cooking', 'Programming' ]

// const copiedArray2 = [hobbies]; // this is not a copy of hobbies, it is an array inside an array

// console.log(copiedArray2); // this is not a copy of hobbies, it is an array inside an array
// // [ [ 'Sports', 'Cooking', 'Programming' ] ]

// const copiedArray3 = [...hobbies]; // this is a copy of hobbies
// console.log(copiedArray3); // this is a copy of hobbies 
// // [ 'Sports', 'Cooking', 'Programming' ]


// // spread operator works for objects too but it only copies the top level, it does not copy nested objects

// const toArray = (arg1, arg2, arg3) => {
//     return [arg1, arg2, arg3];
// }

// console.log(toArray(1, 2, 3)); // [ 1, 2, 3 ]

// const toArray1 = (...args) => { // ...args is the rest operator
//     return args;
// }


// console.log(toArray1(1, 2, 3, 4)); // [ 1, 2, 3, 4 ]

// // rest operator is used to merge a list of function arguments into an array

// // rest operator looks like spread operator but it is not, it is used in a different context   
