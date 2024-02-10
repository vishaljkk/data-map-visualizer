import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const CreateForm = ({labelProp='PointRandom'}) => {
  const { addData } = useContext(GlobalContext);
  const [xCoordinate, setXCoordinate] = useState('');
  const [yCoordinate, setYCoordinate] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    addData({xCoordinate, yCoordinate, "label": labelProp})
  };


  return (
    <div className="max-w-md mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="xCoordinate">
            X Coordinate
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="xCoordinate"
            type="text"
            placeholder="Enter X Coordinate"
            value={xCoordinate}
            onChange={(e) => setXCoordinate(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yCoordinate">
            Y Coordinate
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="yCoordinate"
            type="text"
            placeholder="Enter Y Coordinate"
            value={yCoordinate}
            onChange={(e) => setYCoordinate(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yCoordinate">
            Label
          </label>
          <input
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="yCoordinate"
            type="text"
            placeholder="Enter Y Coordinate"
            value={labelProp}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              type="button"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>

      </form>
      
    </div>
  );
};

export { CreateForm };
