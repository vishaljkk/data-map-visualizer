import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { ToastContainer } from 'react-toastify';
import { CreateForm } from './components/CoordinateForm';
import { ScatterChart } from './components/ScatterChart';
import { GlobalProvider } from './context/GlobalState';
import { getRandomNumber } from './util';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <GlobalProvider>
      <button className='flex grow justify-center w-full bg-green-200' onClick={toggleDrawer}>Create</button>
      <Drawer open={isOpen} onClose={toggleDrawer} direction='right' className='bla bla bla'>
        <CreateForm labelProp={`Point${getRandomNumber(10, 1000)}`}/>
      </Drawer>
      <ScatterChart />
      <ToastContainer />
    </GlobalProvider>
  );
}

export default App;
