const person = {
    name: "John",
    age: 30,
    greet() {
        console.log("Hi, I am " + this.name);
    }
};

person.greet();