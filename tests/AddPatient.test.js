/**
 * @file AddPatient.test.js
 * @author Emre Deniz
 * @date Jan 16, 2024
 */

import React from 'react';
import renderer from 'react-test-renderer';
import AddPatient from '../screens/AddPatient';

// Render
const tree = renderer.create(<AddPatient />).toJSON();

// Check component to have one child element
describe('<AddPatient />', () => {
    it('has 1 child', () => {
        expect(tree.children.length).toBe(1);
    });
});

// Check screen has the "Add New Patient" text
describe('<AddPatient "Add New Patient" Text />', () => {
    it('has the "Add New Patient" title on screen image', () => {
        expect(tree.children[0].children[0].children[0].children[0].children[0]).toBe("Add New Patient");
    });
});
