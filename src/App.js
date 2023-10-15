import CoursesList from "./components/CoursesList";

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="py-20 w-[70%] m-auto">
        <CoursesList />
      </div>
    </Provider>
  );
}

export default App;
