import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import LoginButton from './components/spotifyLogin';

afterEach(cleanup)

//Snapshot Test 
it('Will take a snapshot', () => 
{
    const { asFragment } = render(<LoginButton/>)

    expect(asFragment(<LoginButton/>)).toMatchSnapshot()
})

