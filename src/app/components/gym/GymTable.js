import React from 'react';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';

const GymTable = ({ toolbarItens, gyms, selectedGym, setSelectedGym }) => {
  return (
    <div>
      <Toolbar start={toolbarItens}></Toolbar>
      <DataTable stripedRows value={gyms} rowsPerPageOptions={[20, 50]} selectionMode="single" selection={selectedGym} onSelectionChange={(e) => setSelectedGym(e.value)} dataKey='id' metaKeySelection={false}>
        <Column field='id' header='ID'></Column>
        <Column field='name' header='Name'></Column>
        <Column field='description' header='Description'></Column>
        <Column field='phone' header='Phone'></Column>
      </DataTable>
    </div>
  );
};

export default GymTable;
