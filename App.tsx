import { Provider } from 'react-redux';
import store from './src/store/store';
import { NativeBaseProvider } from 'native-base';
import Root from './src/Root';


export default function App() {
  /* TODO: Set up store */
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Root/>
      </NativeBaseProvider>
    </Provider>
  );
}