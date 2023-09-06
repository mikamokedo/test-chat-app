import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {getFirstChar} from './lib/chat'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});




test("getFirstChar", () =>{
  expect(getFirstChar("Quy")).toEqual("Q")
  expect(getFirstChar("   Quy")).toEqual("Q")
  expect(getFirstChar("123Quy")).toEqual("1")
})
