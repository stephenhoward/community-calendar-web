import test from 'ava';
import sinon from 'sinon';
import axios from 'axios';
import Config from '../../lib/config.mjs';

var getStub = sinon.stub(axios,"get").callsFake((arg) => {
    return new Promise( (resolve, reject) => {
        if ( arg == '/v1/site') {
            resolve({ data :{ "test": "data"}});
        }
        else {
            resolve({ data: ['en-us']});
        }
    });
});

test( 'load config', async t => {

  let config = new Config();
  await config.init();

  t.is(config.settings().test, "data");
  t.deepEqual(config.languages(), ["en-us"]);
});
