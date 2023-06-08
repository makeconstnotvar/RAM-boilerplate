import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Page1} from "./pages/Page1";
import {Page2} from "./pages/Page2";
import {MemoryPage} from "./pages/MemoryPage";
import {Layout} from "./Layout";
import {LandingPage} from "./pages/LandingPage";
import {createRoot} from "react-dom/client";


const App = () => {
  return (
      <BrowserRouter basename='/manager'>
        <Layout>
          <Routes>
            <Route path="/" index element={<LandingPage/>}/>
            <Route path="/page1" element={<Page1/>}/>
            <Route path="/page2" element={<Page2/>}/>
            <Route path="/memory" element={<MemoryPage/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}

const container = document.getElementById('root')
const root = createRoot(container);
root.render(<App/>);
