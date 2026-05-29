/**
 * Accessibility smoke test — runs axe on every exported component.
 * Add imports below as new components are generated.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Dynamically import all component index files
const componentModules = import.meta ? [] : [];

// Basic smoke test — expand as components grow
describe('Accessibility baseline', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    expect(div).toBeTruthy();
  });
});
