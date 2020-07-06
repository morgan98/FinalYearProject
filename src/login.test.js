import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import { shallow } from 'enzyme';
import LoginButton from './components/spotifyLogin';

afterEach(cleanup)
