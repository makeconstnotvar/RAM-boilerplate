import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Page1} from "./pages/Page1";
import {Page2} from "./pages/Page2";
import {Layout} from "./Layout";
import {LandingPage} from "./pages/LandingPage";
import {createRoot} from "react-dom/client";

const App = () => {
  return (
    <Provider {...stores}>
      <BrowserRouter basename='/admin'>
        <Layout>
          <Routes>
            <Route path="/" index element={<LandingPage/>}/>
            <Route path="/page1" element={<Page1/>}/>
            <Route path="/page2" element={<Page2/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

const container = document.getElementById('root')
const root = createRoot(container);
root.render(<App/>);
