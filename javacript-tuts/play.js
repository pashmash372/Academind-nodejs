const person = {
    name: "John",
    age: 30,
    greet() {
        console.log("Hi, I am " + this.name);
    }
};

person.greet();


const hobbies = ['Sports', 'Cooking'];
for (let hobby of hobbies) {
    console.log(hobby);
}

console.log(hobbies.map(hobby => 'Hobby: ' + hobby));

console.log(hobbies);

hobbies.push('Programming');

console.log(hobbies); // hobbies is a constant but we can still push to it because we are not changing the pointer to the array, we are just changing the array itself
