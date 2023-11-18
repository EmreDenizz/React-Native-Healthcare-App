/**
 * @file Patients.test.js
 * @author Emre Deniz (301371047)
 * @author Muindo Gituku (301372521)
 * @date Nov 27, 2023
 * @description React Native Project
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Patients from '../screens/Patients';

// Render
const tree = renderer.create(<Patients />).toJSON();

// Check component to have one child element
describe('<Patients />', () => {
    it('has 1 child', () => {
        expect(tree.children.length).toBe(1);
    });
});

// Check screen has the logo image
describe('<Patients Image Logo />', () => {
    it('has the logo image on screen image', () => {
        expect(tree.children[0].children[0].children[0].children[0].children[0].type).toBe("Image");
    });
});
