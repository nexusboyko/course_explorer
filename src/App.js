import CoursesList from "./components/CoursesList";

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="py-20 w-[70%] m-auto">
        <div className="flex flex-col text-center justify-center items-center mb-8">
          <h1 className="display text-3xl mb-1">🗃️ courseExplorer</h1>
          <small className="text-xs">Made for DubHacks '23 </small>
        </div>
        <CoursesList />
      </div>
    </Provider>
  );
}

export default App;
