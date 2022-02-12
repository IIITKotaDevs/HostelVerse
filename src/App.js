import { Routes, Route } from "react-router-dom";
import Home from './home';
import { HostelList, HostelDetail } from './student'

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:user/hostels" element={<HostelList />} />
        <Route path="/hostels/:id" element={<HostelDetail />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;