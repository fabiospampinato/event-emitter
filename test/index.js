
/* IMPORT */

import * as _ from 'lodash';
import {describe} from 'ava-spec';
import EventEmitter from '../dist';
import {bindings, Model} from './mocks';

/* EVENT EMITTER */

describe ( 'EventEmitter', it => {

  it.beforeEach ( t => {

    t.context.M = new Model ();
    t.context.M.initTemp ();

    t.context.EE = new EventEmitter ( _.cloneDeep ( bindings ) );

  });

  describe ( 'constructor', it => {

    it ( 'Sets the provided bindings', t => {

      t.deepEqual ( bindings, t.context.EE.get () );

    });

  });

  describe ( 'hasHandler', it => {

    it ( 'Checks if an event handler is attached to a particular event', t => {

      const event = '__test__',
            handler = function () {};

      t.false ( t.context.EE.hasHandler ( event, handler ) );

      t.context.EE.on ( event, handler );

      t.true ( t.context.EE.hasHandler ( event, handler ) );

    });

  });

  describe ( 'get', it => {

    it ( 'Gets the entire bindings object', t => {

      t.deepEqual ( bindings, t.context.EE.get () );

    });

  });

  describe ( 'set', it => {

    it ( 'Replaces the current binsings with a provided bindings object', t => {

      t.context.EE.set ( {} );

      t.deepEqual ( {}, t.context.EE.get () );

    });

  });

  describe ( 'reset', it => {

    it ( 'Re-inits the tokens', t => {

      t.context.EE.reset ();

      t.deepEqual ( {}, t.context.EE.get () );

    });

  });

  describe ( 'on', it => {

    it ( 'Adds an handler for a specific event', t => {

      t.context.EE.on ( 'event', t.context.M.h1 );

      t.context.EE.emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), [1] );

    });

    it ( 'The handler won\'t get removed', t => {

      t.context.EE.on ( 'event', t.context.M.h1 );

      _.times ( 5, () => t.context.EE.emit ( 'event' ) );

      t.deepEqual ( t.context.M.getTemp (), [1, 1, 1, 1, 1] );

    });

    it ( 'Can accept an array of events', t => {

      t.context.EE.on ( ['e1', 'e2'], t.context.M.h1 );

      t.context.EE.emit ( ['e1', 'e2'] );

      t.deepEqual ( t.context.M.getTemp (), [1, 1] );

    });

    it ( 'Can accept an array of handlers', t => {

      t.context.EE.on ( 'event', [t.context.M.h1, t.context.M.h2] );

      t.context.EE.emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), [1, 2] );

    });

    it ( 'Can accept both an array of events and handlers', t => {

      t.context.EE.on ( ['e1', 'e2'], [t.context.M.h1, t.context.M.h2] );

      t.context.EE.emit ( ['e1', 'e2'] );

      t.deepEqual ( t.context.M.getTemp (), [1, 2, 1, 2] );

    });

    it ( 'Throws an error if the handler is already bound to the event', t => {

      t.context.EE.on ( 'event', t.context.M.h1 );

      t.throws ( () => t.context.EE.on ( 'event', t.context.M.h1 ), /The handler is already bound to the event/ );

    });

  });

  describe ( 'one', it => {

    it ( 'Adds an handler for a specific event, it will get executed only once', t => {

      t.context.EE.one ( 'event', t.context.M.hOne );

      t.context.EE.emit ( 'event' ).emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), ['one'] );

    });

    it ( 'Handlers can be removed', t => {

      t.context.EE.one ( 'event', t.context.M.hOne );

      t.context.EE.off ( 'event', t.context.M.hOne );

      t.context.EE.emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), [] );

    });

    it ( 'Everything works if some more non-one handlers should be called immediately after', t => {

      t.context.EE.one ( 'event', t.context.M.hOne );

      t.context.EE.on ( 'event', [t.context.M.h1, t.context.M.h2] );

      t.context.EE.emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), ['one', 1, 2] );

    });

    it ( 'Can accept an array of events', t => {

      t.context.EE.one ( ['e1', 'e2'], t.context.M.h1 );

      t.context.EE.emit ( ['e1', 'e2'] ).emit ( ['e1', 'e2'] );

      t.deepEqual ( t.context.M.getTemp (), [1, 1] );

    });

    it ( 'Can accept an array of handlers', t => {

      t.context.EE.one ( 'event', [t.context.M.h1, t.context.M.h2] );

      t.context.EE.emit ( 'event' ).emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), [1, 2] );

    });

    it ( 'Can accept both an array of events and handlers', t => {

      t.context.EE.one ( ['e1', 'e2'], [t.context.M.h1, t.context.M.h2] );

      t.context.EE.emit ( ['e1', 'e2'] ).emit ( ['e1', 'e2'] );

      t.deepEqual ( t.context.M.getTemp (), [1, 2, 1, 2] );

    });

    it ( 'Throws an error if the handler is already bound to the event', t => {

      t.context.EE.one ( 'event', t.context.M.h1 );

      t.throws ( () => t.context.EE.one ( 'event', t.context.M.h1 ), /The handler is already bound to the event/ );

    });

  });

  describe ( 'off', it => {

    it ( 'Removes a specific handler for a specific event', t => {

      t.context.EE.on ( 'event', t.context.M.h1 ).on ( 'event', t.context.M.h2 ).on ( 'event', t.context.M.h3 );

      t.context.EE.off ( 'event', t.context.M.h3 );

      t.context.EE.emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), [1, 2] );

    });

    it ( 'Remove all the handlers for a specific event', t => {

      t.context.EE.on ( 'event', t.context.M.h1 ).on ( 'event', t.context.M.h2 ).on ( 'event', t.context.M.h3 );

      t.context.EE.off ( 'event' );

      t.context.EE.emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), [] );

    });

    it ( 'Can accept an array of events', t => {

      t.context.EE.on ( ['e1', 'e2'], t.context.M.h1 );

      t.context.EE.off ( ['e1', 'e2'] );

      t.context.EE.emit ( ['e1', 'e2'] );

      t.deepEqual ( t.context.M.getTemp (), [] );

    });

    it ( 'Can accept an array of handlers', t => {

      t.context.EE.on ( 'event', [t.context.M.h1, t.context.M.h2] );

      t.context.EE.off ( 'event', [t.context.M.h1, t.context.M.h2] );

      t.context.EE.emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), [] );

    });

    it ( 'Can accept both an array of events and handlers', t => {

      t.context.EE.on ( ['e1', 'e2'], [t.context.M.h1, t.context.M.h2] );

      t.context.EE.off ( ['e1', 'e2'], [t.context.M.h1, t.context.M.h2] );

      t.context.EE.emit ( ['e1', 'e2'] );

      t.deepEqual ( t.context.M.getTemp (), [] );

    });

  });

  describe ( 'emit', it => {

    it ( 'Calls the handlers for a specific event, in order', t => {

      t.context.EE.on ( 'event', t.context.M.h1 ).on ( 'event', t.context.M.h2 ).on ( 'event', t.context.M.h3 );

      t.context.EE.emit ( 'event' );

      t.deepEqual ( t.context.M.getTemp (), [1, 2, 3] );

    });

    it ( 'Passes along any provided argument', t => {

      let args = [1, '__test__', true];

      t.context.EE.on ( 'event', t.context.M.hArgs );

      t.context.EE.emit ( 'event', ...args );

      t.deepEqual ( args, t.context.M.getTemp () );

    });

    it ( 'Works with multiple events', t => {

      t.context.EE.on ( 'event1', t.context.M.h1 );
      t.context.EE.on ( 'event2', t.context.M.h2 );

      t.context.EE.emit ( 'event1' );

      t.deepEqual ( t.context.M.getTemp (), [1] );

      t.context.EE.emit ( 'event2' );

      t.deepEqual ( t.context.M.getTemp (), [1, 2] );

    });

    it ( 'Can accept an array of events', t => {

      t.context.EE.on ( ['e1', 'e2'], t.context.M.h1 );

      t.context.EE.emit ( ['e1', 'e2'] );

      t.deepEqual ( t.context.M.getTemp (), [1, 1] );

    });

  });

});
