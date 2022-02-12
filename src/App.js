import { Routes, Route } from "react-router-dom";
import Landing from './landing';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
