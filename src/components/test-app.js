const app = require('./app.js');
import React from 'react';
import {shallow}from 'enzyme';
import './setupTests';

describe('app', function() {
  it('should render without crashing', () => {
    shallow(<App />);
  });
});