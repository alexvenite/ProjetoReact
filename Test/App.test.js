import React from 'react';
import { render } from '@testing-library/react'; // React Testing Library
import { expect } from 'chai';  // Chai para asserções
import App from '../src/App';   // Caminho para o seu componente

describe('App Component', () => {
  it('should render the correct text', () => {
    const { getByText } = render(<App />);
    expect(getByText('Hello, Mocha!')).to.exist;
  });
});

