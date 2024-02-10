import React, { createContext, useReducer, useContext } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  datapoints: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getDatas() {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/coordinates');

      dispatch({
        type: 'GET_DATAS',
        payload: res.data.data
      });
    } catch (err) {
      toast("Unable to get data")
    }
  }

  async function deleteData(label) {
    try {
      await axios.delete(`http://localhost:5000/api/v1/coordinates/${label}`);

      dispatch({
        type: 'DELETE_DATA',
        payload: label
      });
      toast("Point Successfully deleted")
    } catch (err) {
      toast("Unable to delete the point")
    }
  }

  async function addData(data) {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/coordinates', data);
      dispatch({
        type: 'ADD_DATA',
        payload: res.data.data
      });
      toast("Point Successfully added")
    } catch (err) {
      toast("Unable to add the point")
    }
  }

  async function editData(data) {
    try {
      const res = await axios.put(`http://localhost:5000/api/v1/coordinates/${data.label}`, data);
      dispatch({
        type: 'EDIT_DATA',
        payload: res.data.data
      });
      toast("Point Successfully edited")
    } catch (err) {
      toast("Unable to edit the point")
    }
  }

  return (
    <GlobalContext.Provider value={{
      datapoints: state.datapoints,
      getDatas,
      deleteData,
      addData,
      editData
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook for using GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
}
