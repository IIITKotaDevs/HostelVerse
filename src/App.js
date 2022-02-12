import { Routes, Route } from "react-router-dom";
import Landing from "./landing";
import { PayFee } from "./student/component/PayFee";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<PayFee />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
