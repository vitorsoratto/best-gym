import React, { useEffect, useState } from 'react';

import { getGymList, deleteGym, checkin } from '../../services/api_service';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import GymForm from './GymForm';
import GymTable from './GymTable';
import { Message } from 'primereact/message';

const GymTab = ({ user }) => {
  const toast = React.createRef();
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const isAdmin = user?.role === 'admin';
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGym, setSelectedGym] = useState(null);
  const [changeGym, setChangeGym] = useState(false);

  const handleToolbarClick = async (type) => {
    if (selectedGym === null && (type === 'edit' || type === 'delete' || type === 'checkin')) {
      return;
    }

    if (selectedGym !== null && type === 'new') {
      return;
    }

    if (type === 'delete') {
      await deleteGym(selectedGym.id);
      window.location.reload();
      return;
    }

    if (type === 'checkin') {
      const response = await checkin(selectedGym.id);
      if (response.status === 400) {
        showToast('error', 'Erro', 'Só é permitido um checkin por dia');
        return;
      } else if (response.status !== 201) {
        showToast('error', 'Erro', 'Erro ao realizar checkin');
        return;
      }

      if (response.status === 201) {
        showToast('success', 'Sucesso', 'Checkin realizado com sucesso');
        return;
      }
    }

    setChangeGym(true);
  };

  const adminToolbarItens = (
    <React.Fragment>
      <Button
        icon='pi pi-plus'
        className='mr-2'
        severity='success'
        onClick={(_) => handleToolbarClick('new')}
      />
      <Button icon='pi pi-pencil' className='mr-2' onClick={(_) => handleToolbarClick('edit')} />
      <Button
        icon='pi pi-trash'
        className='mr-2'
        severity='danger'
        onClick={(_) => handleToolbarClick('delete')}
      />
    </React.Fragment>
  );

  const userToolbarItens = (
    <React.Fragment>
      <div>
        <Button
          icon='pi pi-plus'
          label='Checkin'
          className='mr-2'
          severity='success'
          onClick={(_) => handleToolbarClick('checkin')}
        />
        {selectedGym && selectedGym?.name && (
          <Message severity='info' text={'Academia: ' + selectedGym.name} />
        )}
      </div>
    </React.Fragment>
  );

  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);
      const response = await getGymList();
      setGyms(response.data);
      setLoading(false);
    };
    fetchGyms();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (changeGym) {
    return <GymForm gym={selectedGym} setChangeGym={setChangeGym} />;
  } else {
    return (
      <div>
        <Toast ref={toast} />
        <GymTable
          toolbarItens={isAdmin ? adminToolbarItens : userToolbarItens}
          gyms={gyms}
          selectedGym={selectedGym}
          setSelectedGym={setSelectedGym}
        />
      </div>
    );
  }
};

export default GymTab;
