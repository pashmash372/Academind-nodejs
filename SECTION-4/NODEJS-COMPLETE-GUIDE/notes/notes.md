

 process.exit(); // This will exit the event loop and the server will not run

![Alt text](image.png)

![Alt text](image-1.png)

Written DUMMY in the input
![Alt text](image-2.png)

new file message.txt created
![Alt text](image-3.png)

![Alt text](image-4.png)
![Alt text](image-5.png)

![Alt text](image-6.png)

Stream and Buffer

![Alt text](image-7.png)

Single Thread, Event Loop & Blocking Code


![Alt text](image-8.png)

![Alt text](image-9.png)

``` 
BEHIND THE SCENES OF NODEJS

how node works with asynchronous code and i mentioned this event loop which is important.
nodejs exactly executes your code to stay performant and still be able to handle long taking tasks
So in our node application we have our code and one important thing to understand and to really keep in mind is that nodejs uses only one single
javascript thread,a thread is basically like a process in your operating system you could say.
So it's only using that one thread and the obvious question is how is it then able to handle multiple
requests because if we're not able to assign a new thread for each request, they ultimately end up all
running in one on the same thread and this of course poses a security question,
can you then access data from request A, from request B and most importantly here at this point when
we talk about performance, there of course also is the question of does this not mean that if the
request A is still doing work, request B can't be handled? Well both is taken care of nodejs.

Now let's start with the performance.
Let's say we have some code which accesses the file system as we already did in this course too. Now working
with files often is a task that takes longer because files can be very big and it doesn't necessarily complete instantly,
therefore if we're doing this upon an incoming request, a second request might have to wait because we're
not able to handle it yet or it even gets declined,so basically our webpage is down for that user.

Now one important construct I already mentioned is that event loop, the event loop is automatically started
by nodejs when your program starts,you don't have to do that explicitly,nodejs does that when well
it basically starts running code.
This is responsible for handling event callbacks though,so all these nice functions we basically added thus far in create server for example, the event loop is responsible for basically running that code when a certain event occurs you could say, it's aware of all these callbacks and basically well, execute said code. That doesn't help us with our long taking file operation though and it's important to understand that this operation is not handled by the event
loop, just the callback that we might have defined on write file once it's done, that code will be handled in event loop but that code will finish fast,so basically the event loop will only handle callbacks that contain fast finishing code.

Instead our file system operation and a couple of other long taking operations are sent to a worker
pool which is also spun up and managed by nodejs automatically.

This worker pool is responsible for all the heavy lifting,
this worker pool is kind of totally detached of your javascript code you could say and it runs on different
threads, it can spin up multiple threads, it's closely intervened with your operating system you're
running the app on,so this is really detached from your code and this worker pool is therefore doing all the heavy lifting.

If you're doing something with a file, well a worker from that pool will take care and will do its job
totally detached from your code and from the request and from the event loop. The one connection to the event loop
we will have though is that once the worker is done, so for example once we read a file, it will trigger the callback for that read file operation and since the event loop is responsible for the events and the callbacks, this will in the end end up in the event loop, so there nodejs will then basically execute the appropriate callback.

Now this is a lot of behind the scenes stuff which is nice to know, you don't have to write any code to make this work,

Now let's look into that event loop then. That event loop is in the end
a loop which is run or started by nodejs that keeps the nodejs process running
and as I just mentioned, that handles all the callbacks and it has a certain order in which it goes through
the callbacks. So basically it's a loop that just well keeps on looping

unsurprisingly, at the beginning of each new iteration it checks if there are any timer callbacks it
should execute. We haven't set up any timers yet but basically there is set timeout and set interval,

you might know this from frontend javascript too, there these methods also exist. Now in nodejs you can
also set a timer and basically you set a timer and always pass a method, a function that should be executed
once that timer completes and nodejs is aware of this and at the beginning of each new loop iteration,
it executes any due timer callbacks,
so any callbacks that have to be executed because a timer completes. Then as a next step, it checks other
callbacks, for example if we had write or read file, we might have a callback because that operation finished and
it will then also execute these callbacks.

Now be aware that with IO here, I mean generally any input output operations that typically is file
operations but can also be network operations and in general, I'm talking about blocking long taking
operations.

Now it's important to understand that nodejs will leave that phase at a certain point of time and that
can also mean that if there are too many outstanding callbacks, it will continue its loop iteration and
postpone these callbacks to the next iteration to execute them. After working on these open callbacks
and hopefully finishing them all,

it will enter a poll phase. The poll phase is basically a phase where nodejs will look for new IO events
and basically do its best to execute their callbacks immediately if possible.
Now if that's not possible, it will defer the execution and basically register this as a pending callback,
so this is how that works.

Important, it also will check if there are any timer callbacks due to be executed
and if that is the case, it will jump to that timer phase and execute them right away,
so it can actually jump back there and not finish the iteration

otherwise it will continue and next set immediate callbacks will be executed in a so-called check phase. Set immediate is a bit like set timeout or set interval, just that it will execute immediately but always after any open callbacks
have been executed, so typically faster than set timeout with one millisecond of open duration, let's say
but after the current cycle well finished or at least finished open callbacks that were due to be handled in that current iteration.

And now we're entering a highly theoretical terrain
and I don't want to dive too deep into that, though you will find a couple of resources that do dive
deeper at the end of this module in case you want to join the nodejs team and really dive super
hardcore into this.

Now we're nearing the end of each iteration cycle and now nodejs will execute all close event callbacks,
so if you registered any close events and in our code, we haven't
but if you had any close events, this would be the point of time where nodejs executes their appropriate
callbacks.

So roughly spoken, we have timer callbacks, we then have any IO related callbacks and other event callbacks
and set immediate followed by close event callbacks,
so close events are basically handled separately or their callbacks are handled separately we should
say. Well and then we might exit the whole nodejs program but only if there are no remaining event
handlers which are registered and that is what I mean with this refs equal null thing here. Internally
nodejs keeps track of its open event listeners and it basically has a counter, references or refs
which it increments by 1 for every new callback that is registered,every new event listener that is registered
so every new future work that it has to do you could say and it reduces that counter by 1 for every event listener that it doesn't need anymore, every callback it finished and since in a server environment
we create a server with create server and then listen to incoming requests with listen,
this is an event which never is finished by default and therefore, we always have at least one reference
and therefore we don't exit in a normal node web server program. We can call the exit function as you
already saw and if we do anything else like at the beginning of the course when we just used node to execute a file
that did not listen to a web server or on a web server, then it also finishes eventually once its done
with its work.

for now just be aware of that first picture I showed you, of how nodejs handles complex work, that
there is this worker pool that takes care that your things are not getting blocked and that it therefore
stays performant.

Now I also touched on that security thing with that one javascript thread
and regarding that, we also got no problems by default,
though I will come back later to how we can manage global data and how we should manage it to ensure
that we do not spoil data from request A to request B. By default
we have some separation because remember that callback method in create server gets executed for every

new incoming request and therefore this function only runs for that incoming request and anything we do
to the request or response object there will not be exposed to our request or response objects because
each function is only scoped to itself and not accessible by the other functions,

so by default we have that separation due to how javascript works.
```



![Alt text](image-10.png)

![Alt text](image-11.png)

![Alt text](image-12.png)


npm init

![Alt text](image-13.png)

npm and packages

![Alt text](image-14.png)

https://www.npmjs.com/package/nodemon

npm install nodemon --save-dev
![Alt text](image-15.png)

![Alt text](image-16.png)

------------------------------------------------------------------------------------------------------------------------------
```
Global Features vs Core Modules vs Third-Party Modules
The last lectures contained important concepts about available Node.js features and how to unlock them.

You can basically differentiate between:

Global features: Keywords like const or function but also some global objects like process

Core Node.js Modules: Examples would be the file-system module ("fs"), the path module ("path") or the Http module ("http")

Third-party Modules: Installed via npm install - you can add any kind of feature to your app via this way

Global features are always available, you don't need to import them into the files where you want to use them.

Core Node.js Modules don't need to be installed (NO npm install is required) but you need to import them when you want to use features exposed by them.

Example:

const fs = require('fs');

You can now use the fs object exported by the "fs" module.

Third-party Modules need to be installed (via npm install in the project folder) AND imported.

Example (which you don't need to understand yet - we'll cover this later in the course):

// In terminal/ command prompt
npm install --save express-session
// In code file (e.g. app.js)
const sessions = require('express-session');
```

------------------------------------------------------------------------------------------------------------------------------


```
Global & Local npm Packages
In the last lecture, we added nodemon as a local dependency to our project.

The good thing about local dependencies is that you can share projects without the node_modules folder (where they are stored) and you can run npm install in a project to then re-create that node_modules folder. This allows you to share only your source code, hence reducing the size of the shared project vastly.

The attached course code snippets also are shared in that way, hence you need to run npm install in the extracted packages to be able to run my code!

I showed that nodemon app.js would not work in the terminal or command line because we don't use local dependencies there but global packages.

You could install nodemon globally if you wanted (this is NOT required though - because we can just run it locally): npm install -g nodemon would do the trick. Specifically the -g flag ensures that the package gets added as a global package which you now can use anywhere on your machine, directly from inside the terminal or command prompt.

You can also uninstall packages globally again: npm uninstall -g nodemon would do that.
```

![Alt text](image-17.png)

-------------------------------------------------------------------------

**Debugger**

![Alt text](image-18.png)

**Debugging Node.js in Visual Studio Code**


Want to dive super-deep into the latest debugging capabilities Visual Studio Code gives you (for Node.js apps)?

This article will be very helpful: https://code.visualstudio.com/docs/nodejs/nodejs-debugging


**Module Summary**

![Alt text](image-19.png)