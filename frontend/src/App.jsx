import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'

import NavBar from "./components/NavBar";
import TopBanner from "./components/TopBanner";
import Footer from "./components/Footer";

import Home from './pages/Home.jsx'
import VarQuery from "./pages/VarQuery.jsx";
import VarIdent from "./pages/VarIdent.jsx";
import ChipDesignVCF from "./pages/ChipDesignVCF.jsx";
import ChipDesignPop from "./pages/ChipDesignPop.jsx";
import GenImpute from "./pages/GenImpute.jsx";
import Results from "./pages/Results.jsx";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Varify from "./pages/Varify.jsx";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Router>
        <TopBanner />
        <NavBar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/varquery" element={<VarQuery />} />
            <Route path="/varident" element={<VarIdent />} />
            <Route path="/chipdesignvcf" element={<ChipDesignVCF />} />
            <Route path="/chipdesignpop" element={<ChipDesignPop />} />
            <Route path="/genimpute" element={<GenImpute />} />
            <Route path="/results" element={<Results />} />

            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/verify" element={<Varify/>} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App
