# es6-tips-extension

##ES6 has brought a new way of declaring anonymous functions, with a much more simple syntax.

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
