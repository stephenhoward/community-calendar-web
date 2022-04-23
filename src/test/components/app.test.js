/**
 * @vitest-environment jsdom
 */
 
import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import app from '../../components/app.vue';

test( 'load app', () => {
    expect(app).toBeTruthy();

    const wrapper = mount(app, {});
});
