import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import queryClient from './utils/queryClient';
import { HostelList, HostelDetail } from './student'
import Landing from './registration/landing';
import SignUp from './registration/signUp';
import SignIn from './registration/signIn';
import Dashboard from "./student/dashboard";
import Profile from "./student/profile";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/hostels" element={<HostelList />} />
          <Route path="/hostels/:id" element={<HostelDetail />} />
          <Route path="/" element={<Landing />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/:user/dashboard' element={<Dashboard />} />
          <Route path='/:user/profile' element={<Profile />} />
          {/* <Route path="/:user/pay-fee" element={<PayFee />} /> */}
        </Routes>
        {/* <Footer /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
