import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CheckinTable = ({ checkins }) => {
  return (
    <div>
      <DataTable
        paginator
        rows={20}
        stripedRows
        value={checkins}
        dataKey='id'
        metaKeySelection={false}>
        <Column field='gym' header='Academia'></Column>
        <Column field='created_at' header='Data'></Column>
      </DataTable>
    </div>
  );
};

export default CheckinTable;
