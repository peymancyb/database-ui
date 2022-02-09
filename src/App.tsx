import * as React from 'react';
import { Provider } from 'react-redux';
import { AppLayout } from './components';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}

export default App;
