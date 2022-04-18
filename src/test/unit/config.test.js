import { test, expect } from 'vitest';
import sinon from 'sinon';
import axios from 'axios';
import Config from '../../lib/config.mjs';


test( 'load config', async() => {

    let axios_get = sinon.stub(axios,"get").callsFake((arg) => {
        let response = ( arg == '/v1/site')
            ? { data :{ "test": "data"} }
            : { data: ['en-us'] };

        return new Promise( (resolve, reject) => { resolve(response) } );
    });

    await Config.init();

    expect(Config.settings().test).toBe("data");
    expect(Config.languages()).toEqual(["en-us"]);


    let sandbox = sinon.createSandbox();
    sandbox.stub(Config,"_load_settings");

    await(Config.init());

    expect(sandbox.assert.notCalled(Config._load_settings)).toBeFalsy();
});
