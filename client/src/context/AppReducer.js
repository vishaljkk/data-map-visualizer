export default (state, action) => {
  switch(action.type) {
    case 'GET_DATAS':
      return {
        ...state,
        loading: false,
        datapoints: action.payload
      }
    case 'DELETE_DATA':
      return {
        ...state,
        datapoints: state.datapoints.filter(data => data.label !== action.payload)
      }
    case 'ADD_DATA':
      return {
        ...state,
        datapoints: [...state.datapoints, action.payload]
      }
    case 'EDIT_DATA':
      return {
        ...state,
        datapoints: state.datapoints.map(data => data.label === action.payload.label ? action.payload : data)
      }
    default:
      return state;
  }
}
