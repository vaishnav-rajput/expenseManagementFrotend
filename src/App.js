import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoute from "./components/ProtectedRoute";
import Leaderboard from "./pages/Leaderboard";
import { useSelector } from "react-redux";
import EditProfile from "./pages/EditProfile";
import { Navigate } from "react-router-dom";
import Expenses from "./pages/Expenses";

function App() {

  const user = useSelector((state) => state.user.user)

  return (
   <div>
    <div>
      <Navbar/>
    </div>
    <Routes>
      <Route path="/" element={user ? <Navigate to="/expenses"/> : <Login/>}/>
      <Route path="/signup" element={<Registration/>}/>
      <Route path="/leaderboards" element={<Leaderboard/>} />

      <Route 
        path="/expenses"
        element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        }
      />
      

      <Route 
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile></EditProfile>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div>Page not found</div>}/>
    </Routes>
   </div>
  );
}

export default App;
