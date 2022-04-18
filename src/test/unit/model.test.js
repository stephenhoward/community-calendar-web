import { test, expect } from 'vitest';
import sinon from 'sinon';
import axios from 'axios';
import { Model, Translatable } from '../../lib/model.mjs';

let axios_get = sinon.stub(axios,"get");
let axios_post = sinon.stub(axios,"post");

class testModel extends Model {

    static baseUrl() { return '/mock' };
}


test( 'model.dump', () => {

    const model   = new testModel({
       myattr : "foo",
       myarray : ["a","b","c"],
       myrel : new testModel({id: 1234}),
       myarrayrel : [ new testModel({id: 3456}) ]
    });


        expect( model.dump() ).toEqual(
            {
                myattr: "foo",
                myarray: ["a","b","c"],
                myrel: { id: 1234 },
                myarrayrel: [ 3456 ]
            }
        );

});

test( 'model.modelUrl', () => {

    expect( testModel.modelUrl() ).toBe( '/v1/mock' );
    expect( new testModel({ name: "foo" }).modelUrl() ).toBe( '/v1/mock' );
    expect( new testModel({ id: 2, name: "foo" }).modelUrl() ).toBe( '/v1/mock/2' );

});


test( 'fetch', async () => {

    axios_get.returns(Promise.resolve({status: 404 }));

    try {
        let obj = await testModel.fetch(1);
        expect(obj).toBeNull()
    }
    catch {
        expect(1).toBe(0); // test fails if we got here
    }

    axios_get.returns(Promise.resolve({status: 200, data: { myattr: "testing"}}));

    try {
        let obj = await testModel.fetch(2);
        expect(obj).toBeInstanceOf(testModel);
        expect(obj.myattr).toBe("testing");
    }
    catch {
        expect(1).toBe(0); // test fails if we got here
    }
});

test( 'list', async () => {

    axios_get.returns(Promise.resolve({status: 200, data: [] }));

    let objs = await testModel.list();
    expect(objs).toBeInstanceOf(Array);
    expect(objs.length).toBe(0);

    axios_get.returns(Promise.resolve({status: 200, data: [{ myattr:"tested"}] }));

    objs = await testModel.list();
    expect(objs).toBeInstanceOf(Array);
    expect(objs.length).toBe(1);
    expect(objs[0].myattr).toBe("tested");
});

test( 'save', async () => {

    axios_post.returns(Promise.resolve({status: 200, data: { id: 3, myattr: "done" } }));

    let obj = new testModel();
    obj.myattr = "start";

    expect(obj.id).toBeUndefined();
    expect(obj.myattr).toBe("start");

    try {
        let obj_copy = await obj.save();
        expect(obj).toEqual(obj_copy);
        expect(obj.id).toBe(3);
        expect(obj.myattr).toBe("done");
    }
    catch {
        expect(1).toBe(0); // test fails if we got here
    }

});

test ('translatable.get', () => {
    let strings = {
        'en': {
            'name': 'Frank'
        },
        'es': {
            'name': 'Franco'
        }
    };
    let obj = new Translatable({ strings });

    expect(obj.get(['en-us'], 'name')).toBe('');
    expect(obj.get(['en-us','en'], 'name')).toBe('Frank');
    expect(obj.get(['en'], 'name')).toBe('Frank');
    expect(obj.get(['es'], 'name')).toBe('Franco');
});