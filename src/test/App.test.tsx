import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe("App", () => {
  it("renders home link", () => {
    render(<App />);
    const linkElement = screen.getByText(/WikiNews/i);
    expect(linkElement.getAttribute("href")).toBe("/");
  });
  it("does not render any items in tests", () => {
    render(<App />);
    const listElements = screen.queryAllByText("Views:");
    expect(listElements.length).toBe(0);
  });
});


