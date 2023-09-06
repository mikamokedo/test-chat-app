import React from 'react';
import { render, screen } from '@testing-library/react';
import {getFirstChar} from './lib/chat'





test("getFirstChar", () =>{
  expect(getFirstChar("Quy")).toEqual("Q")
  expect(getFirstChar("   Quy")).toEqual("Q")
  expect(getFirstChar("123Quy")).toEqual("1")
  expect(getFirstChar("  quy")).not.toEqual("")
  expect(getFirstChar("  quy")).toEqual("Q")
})
