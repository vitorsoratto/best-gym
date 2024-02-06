import React, { useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const GymTable = ({ toolbarItens, gyms, selectedGym, setSelectedGym }) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className='flex justify-content-between'>
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder='Buscar academias...'
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div>
      <Toolbar start={toolbarItens}></Toolbar>
      <DataTable
        filters={filters}
        filterDisplay='row'
        globalFilterFields={['name']}
        header={header}
        stripedRows
        value={gyms}
        paginator
        rows={20}
        selectionMode='single'
        selection={selectedGym}
        onSelectionChange={(e) => setSelectedGym(e.value)}
        dataKey='id'
        metaKeySelection={false}>
        <Column field='id' header='ID'></Column>
        <Column field='name' header='Name'></Column>
        <Column field='description' header='Description'></Column>
        <Column field='phone' header='Phone'></Column>
      </DataTable>
    </div>
  );
};

export default GymTable;
