import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'

import NavBar from "./components/NavBar";
import TopBanner from "./components/TopBanner";
import Footer from "./components/Footer";

import Home from './pages/Home.jsx'
import Help from "./pages/Help.jsx";

import VarQuery from "./pages/VarQuery.jsx";
import VarIdent from "./pages/VarIdent.jsx";
import ChipDesignVCF from "./pages/ChipDesignVCF.jsx";
import ChipDesignPop from "./pages/ChipDesignPop.jsx";
import GenImpute from "./pages/GenImpute.jsx";
import AstryAly from "./pages/AstryAly.jsx";
// import Results from "./pages/Results.jsx";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Varify from "./pages/Varify.jsx";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";


function App() {
  return (
    <Router>
        <TopBanner />
        <NavBar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/help" element={<Help />} />

            {/* Public Routes */}
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />

            {/* Protected Routes */}
            <Route path="/varquery" element={<ProtectedRoute><VarQuery /></ProtectedRoute>} />
            <Route path="/varident" element={<ProtectedRoute><VarIdent /></ProtectedRoute>} />
            <Route path="/chipdesignvcf" element={<ProtectedRoute><ChipDesignVCF /></ProtectedRoute>} />
            <Route path="/chipdesignpop" element={<ProtectedRoute><ChipDesignPop /></ProtectedRoute>} />
            <Route path="/genimpute" element={<ProtectedRoute><GenImpute /></ProtectedRoute>} />
            <Route path="/astryaly" element={<ProtectedRoute><AstryAly /></ProtectedRoute>} />

            <Route path="/verify" element={<ProtectedRoute><Varify /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/*<Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />*/}


            <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App
