import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Nav from "./components/Nav";

import Login from "./pages/Login";
import Offenses from "./pages/Offenses";
import Cameras from "./pages/Cameras";
import Vehicles from "./pages/Vehicles";
import Fines from "./pages/Fines";

function Home() {
  return (
    <div style={{padding:16}}>
      <h2>RoadSafety Dashboard</h2>
      <p>Use the nav to manage Offenses, Cameras, Vehicles, and Fines.</p>
      <p><Link to="/offenses">Go to Offenses</Link></p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/offenses" element={<PrivateRoute><Offenses/></PrivateRoute>} />
        <Route path="/cameras"  element={<PrivateRoute><Cameras/></PrivateRoute>} />
        <Route path="/vehicles" element={<PrivateRoute><Vehicles/></PrivateRoute>} />
        <Route path="/fines"    element={<PrivateRoute><Fines/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}