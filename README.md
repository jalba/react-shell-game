# React-Shell-Game

A very simple and rough implementation of the shell game with React.

![alt text](https://github.com/jalba/react-shell-game/raw/master/images/shell.png "React-Shell-Game")


## Implementation

To play the game and see how it works, just run: 

```
npm install
``` 
and then:

```
npm start
```

it should start a webpack dev server in http://localhost:3000.


## TODOS

With more time it would be great to do the following:

* I used [React inline styles](https://facebook.github.io/react/tips/inline-styles.html), which are great
for rapid prototyping, but you loose some of the niceties of traditional css. It would be great to
extract the styles to css and be able to use media queries, etc.
* Test: the game currently doesn't have tests, and my next step will be to add mocha, chai and jsdom and write as
many tests as I can come up with.


## Credits

The implementation is built on top of the excellent [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate), by Dan Abramov. 
