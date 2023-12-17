import React from "react";
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));


const actions = [
  { icon: <Link className={'link'} to='/'><HomeIcon /></Link>, name: 'Home' },
  { icon: <Link className={'link'} to='/chat'><ChatIcon /></Link>, name: 'Chat' },
  { icon: <Link className={'link'} to='/login'><LoginIcon /></Link>, name: 'Login' },
  { icon: <Link className={'link'} to='/singUp'><AssignmentIcon /></Link>, name: 'SignUP' },
];

const BallMenu = () => {
  return (
    <>
      <StyledSpeedDial
        ariaLabel="SpeedDial"
        hidden={false}
        icon={<SpeedDialIcon openIcon={<ClearIcon />} icon={<DensityMediumIcon />} />}
        direction={'right'}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </StyledSpeedDial>
    </>
  )
};

export default BallMenu;