import React from 'react';
import { render, screen } from '@testing-library/react';
import {getFirstChar} from './lib/chat'

describe('getFirstChar function', () => {
  it('should return the first character in uppercase from a single word name', () => {
    const result = getFirstChar('John');
    expect(result).toBe('J');
  });

  it('should return the first character in uppercase from a multiple word name', () => {
    const result = getFirstChar('Alice Johnson');
    expect(result).toBe('A');
  });

  it('should handle leading and trailing spaces', () => {
    const result = getFirstChar('   Alex Smith   ');
    expect(result).toBe('A');
  });

  it('should return an empty string for an empty input', () => {
    const result = getFirstChar('');
    expect(result).toBe('');
  });

  it('should return an empty string for input with only spaces', () => {
    const result = getFirstChar('    ');
    expect(result).toBe('');
  });

  it('should handle special characters and symbols', () => {
    const result = getFirstChar('@#$% Name123');
    expect(result).toBe('N');
  });
});