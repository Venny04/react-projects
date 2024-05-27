import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const columns = [
  { column: 2,field: 'name', headerName: 'Nº', width: 80 },
  { column: 1, headerName: 'Nome completo', width: 200 },
  { column: 1, headerName: 'Nº de BI', width: 200 },
  { column: 1, headerName: 'Genero', width: 200 },
  { column: 1, headerName: 'Boletin Nº', width: 200 },
  { column: 1, headerName: 'Idade', width: 100 },
  { column: 1, headerName: 'opções', width: 200 },
];

const rows = [
  {
    id: 0,
    nome: 'João',
    idade: 20,
    curso: 'Engenharia',
  },
  {
    id: 1,
    nome: 'Maria',
    idade: 22,
    curso: 'Medicina',
  },
  {
    id: 2,
    nome: 'Carlos',
    idade: 19,
    curso: 'Administração',
  },
  {
    id: 2,
    nome: 'Carlos',
    idade: 19,
    curso: 'Administração',
  },
  {
    id: 2,
    nome: 'Carlos',
    idade: 19,
    curso: 'Administração',
  },
  {
    id: 2,
    nome: 'Carlos',
    idade: 19,
    curso: 'Administração',
  },
  
  // Adicione mais objetos para representar outros alunos
];
export default function ExportCustomToolbar() {
  // const { data, loading } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 4,
  //   maxColumns: 6,
  // });

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
