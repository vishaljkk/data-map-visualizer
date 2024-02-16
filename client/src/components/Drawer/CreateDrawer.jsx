import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { getRandomNumber } from '../../util';
import { CreateForm } from '../CoordinateForm';

function CreateDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      <button className='flex grow justify-center w-full bg-green-200' onClick={toggleDrawer}>Create</button>
      <Drawer open={isOpen} onClose={toggleDrawer} direction='right' className='bla bla bla'>
        <CreateForm labelProp={`Point${getRandomNumber(10, 1000)}`}/>
      </Drawer>
      </>
  );
}

export { CreateDrawer }