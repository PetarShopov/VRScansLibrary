import React, { useState, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Home from './components/Home';
import LeftsideMenu from './components/LeftsideMenu';
import vrScansReducer from './reducers/vrScansReducer';
import VRScansContext from './VRScansContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
  },
  leftsideMenu: {
    padding: '35px 20px 0px',
    height: '100%',
    borderRight: '1px solid #d3d3d3',
  },
  home: {
    flex: 1,
  },
  toggleIcon: {
    position: 'absolute',
    top: '5px',
    left: '5px',
  },
}));

const initialFiltersState = {
  types: [],
  colors: [],
  tags: [],
  searchTerm: '',
}

function App() {
  const classes = useStyles();
  const [filters, dispatch] = useReducer(vrScansReducer, initialFiltersState);
  const [hide, setHide] = useState(window.innerWidth <= 1024 ? true : false);

  const handleToggle = () => {
    setHide(!hide);
  }

  const getLeftsideMenuStyles = (hide) => {
    if (hide) {
      return {
        display: 'none',
      }
    } else {
      return {
        display: 'inherit',
      }
    }
  }

  const renderToggleIcon = () => {
    return (
      <div className={classes.toggleIcon} onClick={handleToggle}>
        {hide ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      </div>
    )
  }
  
  return (
    <VRScansContext.Provider value={dispatch}>
      <div className={classes.root}>
        {renderToggleIcon()}
        <div className={classes.leftsideMenu} style={getLeftsideMenuStyles(hide)}>
          <LeftsideMenu />
        </div>
        <div className={classes.home}>
          <Home types={filters.types} colors={filters.colors} tags={filters.tags} searchTerm={filters.searchTerm}/>
        </div>
      </div>
    </VRScansContext.Provider >
  );
}

export default App;
