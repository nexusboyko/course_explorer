import CoursesList from "./components/CoursesList";

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <header>
        <h1 className="text-xl">Course Explorer</h1>
      </header>
      <hr></hr>
      <div className="py-20 w-[70%] m-auto">
        <CoursesList />
      </div>
      <footer>made with love by Alexander Boyko, Daniel Hughes, and Julian Del Pino</footer>
    </Provider>
  );
}

export default App;
