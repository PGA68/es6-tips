# es6-tips

##1. Arrow functions

ES6 has brought a new way of declaring anonymous functions, with a simpler syntax.

    const sum = (a, b) => {
        const sum = a + b;
        return sum;
    }

If the body of the function has only one return, the syntax becomes even more simplified, allowing the coder to drop the "{ }"

    const sum2 = (a, b) => a + b;

There is a catch however: if we want to return an object, we have to surround it with "( )", otherwise the parser will not know what to do with the "{ }":

    const func = (a, b) => ({
        sum: a + b,
        prod: a * b
    });

You can take this one step further and have a single parameter for the function, allowing you to drop the parantheses around the paramenteres, but a lot of people prefer not to drop them since it provides for a more readable syntax:

    const pow = x => x * x;

Aside for the fact that the syntax is much shorter, there is one  more reason to use arrow functions: they have no scope, meaning there is no "this" keyword. They will keep the exterior scope.

##2. Object destructuring

Similar to array destructuring, object destructuring allows you to asign values to an object in variables.

    let obj = {
        name: 'John Doe',
        email: 'john@doe.com',
        twitter: '@johndoe'
    };

    ({ name, email } = obj);
    // same as name = obj.name, email = obj.name


This is really easy to use even in parameters of a function:

    let user = {
        id: 1,
        name: 'John Doe',
        email: 'john@doe.com',
        someOtherField: 'lorem ipsum'
    };

    const sayHello = ({ name, email }) => {
        console.log('Hello ', name, '. You can use ', email, ' to log in');
    };
    sayHello(user);

##3. Template literals

Template literals were introduced in ES6 to allow easy string interpolations and multi-line strings (finally). To use template literals simply wrap your string between backticks. A few examples:

    const name = 'John';
    const getAge = () => 34;

    console.log(`Hello, my name is ${name} and I am ${getAge()}.`);

    // Multiline example
    console.log(`This is a
    multiline example
    of template literals`);

##4. `for .. of` syntax for looping over arrays

ES6 brings a new simple and concise way to loop over arrays:

    const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

    for (const planet of planets) {
        console.log(planet);
    }

    // If we need the index we can use something like this
    for (const [i, planet] of planets.entries()) {
        console.log(`${planet} is the planet no. #${i + 1}`);
    }

##5. Spread operator to convert iterables to arrays

The spread operator can be used to transform iterables to actual arrays. Remember `Array.prototype.forEach.call(document.getElementsByTagName('img'), function () { ... })`? Well, now you can simply:

    [...document.getElementsByTagName('img')]
            .forEach(({ src }) => console.log(src))

(also notice destructuring used to only get the `src` property from the img objects over which we loop)