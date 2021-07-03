import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './state';
import { App } from './App';

test('useless renders stuff test', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Axis & Allies Dashboard/i)).toBeInTheDocument();
});
