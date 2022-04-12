import test from 'ava';
import sinon from 'sinon';
import axios from 'axios';
import { Model, Translatable } from '../../app/lib/model.mjs';

let axios_get = sinon.stub(axios,"get");
let axios_post = sinon.stub(axios,"post");

class testModel extends Model {

    static baseUrl() { return '/mock' };
}


test( 'model.dump', t => {

    const model   = new testModel({
       myattr : "foo",
       myarray : ["a","b","c"],
       myrel : new testModel({id: 1234}),
       myarrayrel : [ new testModel({id: 3456}) ]
    });


        t.deepEqual( model.dump(),
            {
                myattr: "foo",
                myarray: ["a","b","c"],
                myrel: { id: 1234 },
                myarrayrel: [ 3456 ]
            }
        );

});

test( 'model.modelUrl', t => {

    t.is( testModel.modelUrl(), '/v1/mock' );
    t.is( new testModel({ name: "foo" }).modelUrl(), '/v1/mock' );
    t.is( new testModel({ id: 2, name: "foo" }).modelUrl(), '/v1/mock/2' );

});


test( 'fetch', async t => {

    axios_get.returns(Promise.resolve({status: 404 }));

    try {
        let obj = await testModel.fetch(1);
        t.is(obj, null);
    }
    catch {
        t.fail();
    }

    axios_get.returns(Promise.resolve({status: 200, data: { myattr: "testing"}}));

    try {
        let obj = await testModel.fetch(2);
        t.true(obj instanceof testModel);
        t.is(obj.myattr, "testing");
    }
    catch {
        t.fail();
    }
});

test( 'list', async t => {

    axios_get.returns(Promise.resolve({status: 200, data: [] }));

    try {
        let objs = await testModel.list();
        t.true(objs instanceof Array);
        t.is(objs.length,0)
    }
    catch {
        t.fail();
    }

    axios_get.returns(Promise.resolve({status: 200, data: [{ myattr:"tested"}] }));

    try {
        let objs = await testModel.list();
        t.true(objs instanceof Array);
        t.is(objs.length,1)
        t.is(objs[0].myattr, "tested");
    }
    catch {
        t.fail();
    }
});

test( 'save', async t => {

    axios_post.returns(Promise.resolve({status: 200, data: { id: 3, myattr: "done" } }));

    let obj = new testModel();
    obj.myattr = "start";

    t.is(obj.id, undefined );
    t.is(obj.myattr, "start");

    try {
        let obj_copy = await obj.save();
        t.deepEqual(obj,obj_copy);
        t.is(obj.id, 3);
        t.is(obj.myattr, "done");
    }
    catch {
        t.fail();
    }

});

test ('translatable.get', t => {
    let strings = {
        'en': {
            'name': 'Frank'
        },
        'es': {
            'name': 'Franco'
        }
    };
    let obj = new Translatable({ strings });

    t.is(obj.get(['en-us'], 'name'), '', 'locale key must be exact');
    t.is(obj.get(['en-us','en'], 'name'), 'Frank', 'fallback logic example');
    t.is(obj.get(['en'], 'name'), 'Frank');
    t.is(obj.get(['es'], 'name'), 'Franco');
});