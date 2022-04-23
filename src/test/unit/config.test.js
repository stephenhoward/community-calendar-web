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

    const config = await Config.init();

    expect(config.settings().test).toBe("data");
    expect(config.languages()).toEqual(["en-us"]);


    let sandbox = sinon.createSandbox();
    sandbox.stub(Config,"_load_settings");

    await(Config.init());

    expect(sandbox.assert.notCalled(Config._load_settings)).toBeFalsy();
});
