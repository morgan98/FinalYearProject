//
import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import { shallow } from 'enzyme'
import App from './App';

afterEach(cleanup)

//Snapshot Test 
it('Will take a snapshot', () => 
{
    const { asFragment } = render(<App/>)

    expect(asFragment(<App/>)).toMatchSnapshot()
})











