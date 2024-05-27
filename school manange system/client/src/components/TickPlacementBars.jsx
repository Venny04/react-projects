import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useEffect, useState } from 'react';
import { fetchAPIdata } from '../assets/api/fecthSchoolAPI';





const valueFormatter = (value) => `${value} total`;



export default function TickPlacementBars() {
  
  const [tickPlacement, setTickPlacement] = useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = useState('middle');
  const [dataset, setDataset] = useState([{}]);

  const [entidade, setEntidade] = useState('alunos');
  const chartSetting = {
    yAxis: [
      {
        label: 'Cadastros Messais',
      },
    ],
    series: [{ dataKey: 'seoul', label: entidade.toLocaleUpperCase(), valueFormatter }],
    height: 265,
    sx: {
      [`&  .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };
  const handleChange = (event) => {
    setEntidade(event.target.value);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchAPIdata(`http://localhost:8080/api/v1/admin/school/status?entidade=${entidade}`, 'GET', '');

        if(!response) return;
        setDataset(response?.estatisticas);
      } catch (error) {
        console.log(error?.response?.data);
      }
    }
    getData();

  }, [entidade]);

  return (
    <div style={{ width: '100%' }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Filtrar
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={entidade}
          onChange={handleChange}
          label="Filtrar"
        >
          <MenuItem value={'alunos'}>Alunos</MenuItem>
          <MenuItem value={'professores'}>Professores</MenuItem>
        </Select>
      </FormControl>
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: 'month', tickPlacement, tickLabelPlacement },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
