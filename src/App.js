import { Routes, Route } from "react-router-dom";
import { HostelList, HostelDetail } from './student'
import Landing from './registration/landing';
import SignUp from './registration/signUp';
import SignIn from './registration/signIn';
import Dashboard from "./student/dashboard";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/:user/hostels" element={<HostelList />} />
        <Route path="/hostels/:id" element={<HostelDetail />} />
        <Route path="/" element={<Landing />} />
        <Route path='/home' element={<Landing />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/:user/dashboard' element={<Dashboard />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;