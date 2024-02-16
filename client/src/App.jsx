import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ScatterChart } from './components/ScatterChart';
import { CreateDrawer } from './components/Drawer';
import { GlobalProvider } from './context/GlobalState';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <GlobalProvider>
      <CreateDrawer />
      <ScatterChart />
      <ToastContainer />
    </GlobalProvider>
  );
}

export default App;
