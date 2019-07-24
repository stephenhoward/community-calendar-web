import test from 'ava';
import compose from '../app/lib/compose';

let testVue = {
    data: function() {
        return {
            foo: "foo"
        }
    },
    methods: {
        testMethod: function() {
            return "testMethod";
        }
    }
};

let testVue2 = {
    data: function() {
        return  {
            bar: "bar"
        }
    }
};

test( 'missing components', t => {

    t.throws( () => {
        let newVue = compose.Vue(testVue);
    });
});

test( 'empty components', t => {

    let newVue = compose.Vue(testVue, {} );
    t.true( 'components' in newVue );
    t.true( ! ( 'child-vue'  in newVue.components ) );
});

test( 'basic compose', t => {

    let newVue = compose.Vue(testVue, {
        'child-vue': testVue2
    });
    t.true( 'components' in newVue );
    t.true( 'child-vue'  in newVue.components );
});

test( 'missing list components', t => {

    t.throws( () => {
        let newVue = compose.ListVue();
    });
});

test( 'empty list components', t => {

    t.throws( () => {
        let newVue = compose.ListVue({});
    });
});

test( 'missing list summary component', t => {

    t.throws( () => {
        let newVue = compose.ListVue({ 'model-form': testVue });
    });
});

test( 'missing list form component', t => {

    t.throws( () => {
        let newVue = compose.ListVue({ 'model-summary': testVue });
    });
});

test ( 'list compose', t => {

    let newVue = compose.ListVue({
        'model-summary': testVue,
        'model-form': testVue2,
        'bad-vue': {}
    });

    t.true( 'props' in newVue );
    t.true( newVue.props[0] == 'type' );
    t.true( 'components' in newVue );
    t.false( 'bad-vue' in newVue.components );
    t.deepEqual( testVue, newVue.components['model-summary'] );
    t.deepEqual( testVue2, newVue.components['model-create'].components['model-form'] );
});

test( 'missing edit components', t => {

    t.throws( () => {
        let newVue = compose.editVue();
    });
});

test( 'bad edit form component', t => {

    t.throws( () => {
        let newVue = compose.editVue([]);
    });
});

test ( 'edit compose', t => {

    let newVue = compose.editVue(testVue);

    t.true( 'props' in newVue );
    t.true( newVue.props[0] == 'type' );
    t.true( 'components' in newVue );
    t.false( 'bad-vue' in newVue.components );
    t.deepEqual( testVue, newVue.components['model-edit'].components['model-form'] );
});