const fetchData= () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        },1500);
    });
    return promise;    
}

setTimeout(() => { 
    console.log('Timer is done!');
    fetchData().then(text => {
        console.log(text);
        return fetchData();
    })
    .then(text2 => {
        console.log(text2);
    });
 }, 2000); // this will be printed last


setTimeout(() => { 
    console.log('Timer is done!');
    fetchData(text => {
        console.log(text);
    });
 }, 2000); // this will be printed last

// above is asynchronous code, it will be executed last

console.log('Hello!'); // this will be printed first
console.log('Hi!'); // this will be printed second 

// above is synchronous code, it will be executed first

