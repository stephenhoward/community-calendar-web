import Authentication from '../../app/lib/authentication.mjs';
import sinon from 'sinon';
import test from 'ava';
import axios from 'axios';

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

async function test_basic_axios_roundtrip(t,stubbed_axios_method,auth_method,params) {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    stubbed_axios_method.returns(Promise.resolve({status: 200, statusText: "Ok"}));

    try {
        await authentication[auth_method]();
        t.fail('vaildation passed but should not have');
    }
    catch {
        t.pass('validation failed');
    }

    try {
        await authentication[auth_method]('');
        t.fail('vaildation passed but should not have');
    }
    catch {
        t.pass('validation failed');
    }

    await authentication[auth_method](...params);

    t.pass('validation passed');
}

test( 'constructor validation', t => {

    try {
        let authentication = new Authentication();
    }
    catch( error ) {
        t.is( error, "Must provide a localStorage object");                                                                             
    }

});

test( 'login fail', t => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_unset_token");
    sandbox.stub(authentication,"_set_token");
    axios_post.returns(Promise.resolve({status: 400, data: {}}));

    return authentication.login('user','password')
        .then( r => { t.fail() })
        .catch( r => {
            t.falsy(sandbox.assert.notCalled(authentication._set_token));
            t.falsy(sandbox.assert.calledOnce(authentication._unset_token));
        });

});

test( 'login succeed', t => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_unset_token");
    sandbox.stub(authentication,"_set_token");
    axios_post.returns(Promise.resolve({status: 200, data: {}}));

    return authentication.login('user','password')
        .then( r => {
            t.falsy(sandbox.assert.notCalled(authentication._unset_token));
            t.falsy(sandbox.assert.calledOnce(authentication._set_token));
        })
        .catch( err => {
            console.log(err);
            t.fail()
        });

});

test( 'logout', t => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_unset_token");

    authentication.logout();

    t.falsy(sandbox.assert.calledOnce(authentication._unset_token));
});

test ('is_logged_in', t => {
    let store = new LocalStore();
    let authentication = new Authentication( store );

    t.false( authentication.is_logged_in() );

    authentication._set_token(fake_jwt);

    t.false( authentication.is_logged_in() );

    let good_jwt = '1234.'+btoa('{ "exp": "'+(Date.now()+500)+'"}');
    authentication._set_token(good_jwt);

    t.true( authentication.is_logged_in() );

});

test( 'reset_password', async t => {

    await test_basic_axios_roundtrip(t,axios_post,'reset_password',['email']);
});

test( 'check_password_reset_token', async t => {

    await test_basic_axios_roundtrip(t,axios_get,'check_password_reset_token',['token']);
});

test( 'use_password_reset_token', async t => {

    await test_basic_axios_roundtrip(t,axios_post,'use_password_reset_token',['token','password']);
});

test( '_set_token', t => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_refresh_login");

    authentication._set_token(fake_jwt);

    let stored_jwt = authentication.jwt();

    t.deepEqual( fake_jwt, stored_jwt, "stored the jwt" );
    sandbox.assert.calledOnce(authentication._refresh_login);
});

test( '_unset_token', t => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.stub(authentication,"_refresh_login");

    authentication._set_token(fake_jwt);
    authentication._refresh_timer = setTimeout( () => {}, 1000 );

    t.truthy( authentication.localStore.getItem('jwt') );
    t.truthy( authentication.localStore.getItem('jw_token') );
    t.truthy( authentication._refresh_timer );

    authentication._unset_token();

    t.falsy( authentication.localStore.getItem('jwt') );
    t.falsy( authentication.localStore.getItem('jw_token') );
    t.falsy( authentication._refresh_timer );

});

test ( '_refresh_login 0 timer', t => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();

    sandbox.stub(authentication,"_unset_token")

    authentication._refresh_login(0);

    t.falsy( sandbox.assert.calledOnce(authentication._unset_token) );
});

test ( '_refresh_login valid', async t => {

    let authentication = new Authentication( new LocalStore() );
    let sandbox = sinon.createSandbox();
    sandbox.useFakeTimers();

    sandbox.stub(authentication,"_set_token")
    sandbox.stub(authentication,"_unset_token")
    axios_get.returns(Promise.resolve({status: 200, statusText: "Ok", data: fake_jwt}));

    let promise = authentication._refresh_login( Date.now() + 500)
    .then( r => {
        t.falsy( sandbox.assert.notCalled(authentication._unset_token) );
        t.falsy( sandbox.assert.calledOnce(authentication._set_token) );
    })
    .catch( err => {
        t.fail();
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
//     axios_get.returns(Promise.resolve({status: 403, statusText: "No", data: []}));

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
