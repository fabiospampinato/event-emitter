
/* MOCKS */

const bindings = { event: [function () {}] };

class Model {
  constructor () {
    this.initTemp ();
    this.h1 = this.handler1.bind ( this );
    this.h2 = this.handler2.bind ( this );
    this.h3 = this.handler3.bind ( this );
    this.hArgs = this.handlerArgs.bind ( this );
    this.hThis = this.handlerThis.bind ( this );
    this.hOne = this.handlerOne.bind ( this );
  }
  handler1 () {
    this.temp.push ( 1 );
  }
  handler2 () {
    this.temp.push ( 2 );
  }
  handler3 () {
    this.temp.push ( 3 );
  }
  handlerArgs ( ...args ) {
    this.temp = args;
  }
  handlerThis () {
    this.temp = this;
  }
  handlerOne () {
    this.temp.push ( 'one' );
  }
  initTemp () {
    this.temp = [];
  }
  getTemp () {
    return this.temp;
  }
}

/* EXPORT */

module.exports = {bindings, Model};
