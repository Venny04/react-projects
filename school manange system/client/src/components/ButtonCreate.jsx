import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PrintIcon from '@mui/icons-material/Print';
import { GlobalContext } from '../utils/context/GlobalContext';

export default function OpenIconSpeedDial({ handleFunction }) {
  const { userAuth } = React.useContext(GlobalContext);

  const actions = [
    { icon: <AddIcon />, name: 'Cadastrar', fc: () => {} },
    // { icon: <AssignmentIcon />, name: 'Ver Pauta', fc: () => {} },
    { icon: <PrintIcon />, name: 'Tira Printe', fc: () => { window.print(); } },
    { icon: <DeleteIcon />, name: 'Apagar Lista', fc: () => {} }
  ];

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 20 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          (userAuth?.role !== 'admin' && action.name === 'Apagar Lista') ? null : (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action?.fc}
            />
          )
        ))}
      </SpeedDial>
    </Box>
  );
}