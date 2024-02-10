import React, { useContext, useRef, useEffect, useState } from 'react';
import { Scatter, getDatasetAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { GlobalContext } from '../../context/GlobalState';
import { UpdateDeleteForm } from '../CoordinateForm';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function transformCoordinates(coordinates) {

  const transformedData = coordinates.map(coord => ({
    label: coord.label,
    data: [{ x: coord.xCoordinate, y: coord.yCoordinate }],
    backgroundColor: "rgba(255, 99, 132, 1)"
  }));

  return transformedData;
}

export const ScatterChart = () => {
  const chartRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [currentDataPoint, setDataPoint] = useState({
    xCoordinateProp: undefined,
    yCoordinateProp: undefined,
    labelProp: undefined
  });

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  const { datapoints, getDatas } = useContext(GlobalContext);

  useEffect(() => {
    getDatas();
  }, [])

  const printDatasetAtEvent = dataset => {
    if (!dataset.length) return;
    
    const datasetIndex = dataset[0].datasetIndex;

    setDataPoint({
      xCoordinateProp: datapoints[datasetIndex].xCoordinate,
      yCoordinateProp: datapoints[datasetIndex].yCoordinate,
      labelProp: datapoints[datasetIndex].label
    })
    toggleDrawer()
  };


  const onClick = event => {
    if (chartRef.current !== undefined) {
      printDatasetAtEvent(getDatasetAtEvent(chartRef.current, event));
    }
  };

  return (
    <>
      { datapoints.length < 1 &&
        <p>No Data Points available yet. Loading them</p>
      }
      {transformCoordinates(datapoints).length > 0 ? <Scatter options={options} data={{datasets : transformCoordinates(datapoints)}} ref={chartRef} onClick={onClick} /> : null }
      <Drawer open={isOpen} onClose={toggleDrawer} direction='right' className='bla bla bla'>
        {currentDataPoint && <UpdateDeleteForm {...currentDataPoint} />}
      </Drawer>
    </>
  )
}
