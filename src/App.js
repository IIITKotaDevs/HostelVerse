import { Routes, Route } from "react-router-dom";
import { HostelList, HostelDetail } from './student'
import Landing from './registration/landing';
import SignUp from './registration/signUp';
import SignIn from './registration/signIn';
import Landing from "./landing";
import { PayFee } from "./student/component/PayFee";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/hostels" element={<HostelList />} />
        <Route path="/hostels/:id" element={<HostelDetail />} />
        <Route path="/" element={<Landing />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path="/" element={<PayFee />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
