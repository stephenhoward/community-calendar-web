import { test, expect } from 'vitest';
import sinon from 'sinon';
import axios from 'axios';

import Authentication from '../../lib/authentication.mjs';

class LocalStore {
    constructor() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key];
    }

    setItem(key,value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

let axios_get = sinon.stub(axios,"get");
let axios_post = sinon.stub(axios,"post");
let fake_jwt = '1234.'+btoa('{ "exp": "1000"}');

async function test_basic_axios_roundtrip(stubbed_axios_method,auth_method,params) {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    stubbed_axios_method.returns(Promise.resolve({status: 200, statusText: "Ok"}));

    await expect( () => authentication[auth_method]() ).rejects.toThrowError();
    await expect( () => authentication[auth_method]('') ).rejects.toThrowError();
    return await authentication[auth_method](...params);
}

test( 'constructor validation', () => {

    expect( () => new Authentication() ).toThrow("Must provide a localStorage object");
});

test( 'login fail', async () => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_unset_token");
    sandbox.stub(authentication,"_set_token");
    axios_post.returns(Promise.reject({status: 400, data: {}}));

    try {
        await authentication.login('user','password');
    }
    catch {
        expect(sandbox.assert.notCalled(authentication._set_token)).toBeFalsy();
        expect(sandbox.assert.calledOnce(authentication._unset_token)).toBeFalsy();
    };

});

test( 'login succeed', async () => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_unset_token");
    sandbox.stub(authentication,"_set_token");
    axios_post.returns(Promise.resolve({status: 200, data: {}}));

    await authentication.login('user','password');

    expect(sandbox.assert.notCalled(authentication._unset_token)).toBeFalsy();
    expect(sandbox.assert.calledOnce(authentication._set_token)).toBeFalsy();
});

test( 'logout', () => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_unset_token");

    authentication.logout();

    expect(sandbox.assert.calledOnce(authentication._unset_token)).toBeFalsy();
});

test ('is_logged_in', () => {
    let store = new LocalStore();
    let authentication = new Authentication( store );

    expect( authentication.is_logged_in() ).toBe(false);

    authentication._set_token(fake_jwt);

    expect( authentication.is_logged_in() ).toBe(false);

    let good_jwt = '1234.'+btoa('{ "exp": "'+(Date.now()+500)+'"}');
    authentication._set_token(good_jwt);

    expect( authentication.is_logged_in() ).toBe(true);

});

test( 'reset_password', async () => {

    await test_basic_axios_roundtrip(axios_post,'reset_password',['email']);
});

test( 'check_password_reset_token', async () => {

    await test_basic_axios_roundtrip(axios_get,'check_password_reset_token',['token']);
});

test( 'use_password_reset_token', async () => {

    await test_basic_axios_roundtrip(axios_post,'use_password_reset_token',['token','password']);
});

test( '_set_token', () => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_refresh_login");

    authentication._set_token(fake_jwt);

    let stored_jwt = authentication.jwt();

    expect( fake_jwt ).toEqual( stored_jwt );
    sandbox.assert.calledOnce(authentication._refresh_login);
});

test( '_unset_token', () => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_refresh_login");

    authentication._set_token(fake_jwt);
    authentication._refresh_timer = setTimeout( () => {}, 1000 );

    expect( authentication.localStore.getItem('jwt') ).toBeTruthy();
    expect( authentication.localStore.getItem('jw_token') ).toBeTruthy();
    expect( authentication._refresh_timer ).toBeTruthy();

    authentication._unset_token();

    expect( authentication.localStore.getItem('jwt') ).toBeFalsy();
    expect( authentication.localStore.getItem('jw_token') ).toBeFalsy();
    expect( authentication._refresh_timer ).toBeFalsy();

});

test ( '_refresh_login 0 timer', () => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();

    sandbox.stub(authentication,"_unset_token")

    authentication._refresh_login(0);

    expect( sandbox.assert.calledOnce(authentication._unset_token) ).toBeFalsy();
});

test ( '_refresh_login valid', async () => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.useFakeTimers();

    sandbox.stub(authentication,"_set_token")
    sandbox.stub(authentication,"_unset_token")
    axios_get.returns(Promise.resolve({status: 200, statusText: "Ok", data: fake_jwt}));

    let promise = authentication._refresh_login( Date.now() + 500)
    .then( r => {
        expect( sandbox.assert.notCalled(authentication._unset_token) ).toBeFalsy();
        expect( sandbox.assert.calledOnce(authentication._set_token) ).toBeFalsy();
    });
    sandbox.clock.runAll();

    return promise;
});

// Async collision with above test where they both want to override axios_get
// test ( '_refresh_login invalid', t => {

//     let authentication = new Authentication( new LocalStore() );
//     let sandbox = sinon.createSandbox();
//     sandbox.useFakeTimers();

//     sandbox.stub(authentication,"_set_token");
//     sandbox.stub(authentication,"_unset_token");
//     axios_get.returns(Promise.reject({status: 403, statusText: "No", data: []}));

//     let promise = authentication._refresh_login( Date.now() + 600)
//     .then( r => {
//         t.fail();
//     })
//     .catch( err => {
//         t.falsy( sandbox.assert.notCalled(authentication._set_token) );
//         t.falsy( sandbox.assert.calledOnce(authentication._unset_token) );
//     });
//     sandbox.clock.runAll();

//     return promise;
// });
