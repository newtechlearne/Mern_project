import { BrowserRouter, Routes, Route } from "react-router-dom";

import Add from "./pages/Add";
import Plant from "./pages/Plants";
import Update from "./pages/Update";

import "./style.css";


function App() {
  return (
  
    <div className="App">
      <BrowserRouter>
        <Routes>
       
          <Route path="/" element={<Plant/>} />
        
          <Route path="/plants/:id" element={<Plant />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
