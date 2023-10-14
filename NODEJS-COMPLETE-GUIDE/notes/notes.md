
Express.js 
==========
Dont reinvent the wheel.
Express.js is a framework that makes it easy to build web applications. It is built on top of Node.js.

What's in this Module?

![Alt text](image-1.png)

npm and packages

![Alt text](image-2.png)

What and why?
![Alt text](image-3.png)

# Installing Express.js
npm install --save express



![Alt text](image.png)

Its all about middleware

![Alt text](image-4.png)

![Alt text](image-6.png)

app listen 
intent to listen to incoming requests
const server = http.createServer(app);
server.listen(3000);

![Alt text](image-5.png)

![Alt text](image-7.png)


https://expressjs.com/en/5x/api.html#app.use

checkout app.use docs

![Alt text](image-8.png)


 npm install --save body-parser

 ![Alt text](image-9.png)
 ![Alt text](image-11.png)

 ![Alt text](image-10.png)

 ```Node.js
 In the next lecture, we'll write this code:

module.exports = path.dirname(process.mainModule.filename);

(I explain why we write this code in the next lecture when we write it!)

The important thing is that you might get a deprecation warning for that code - in that case, you can simply switch to this code:

module.exports = path.dirname(require.main.filename);
Quite straightforward :)
 ```