import React, { useEffect, useState } from 'react';

import { getGymList, deleteGym } from '../../services/api_service';
import { Button } from 'primereact/button';

import GymForm from './GymForm';
import GymTable from './GymTable';

const GymTab = ({ user }) => {
  const isAdmin = user?.role === 'admin';
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGym, setSelectedGym] = useState(null);
  const [changeGym, setChangeGym] = useState(false);

  const handleToolbarClick = async (type) => {
    if (selectedGym === null && (type === 'edit' || type === 'delete')) {
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
      <Button
        icon='pi pi-plus'
        className='mr-2'
        severity='success'
        onClick={(_) => handleToolbarClick('checkin')}
      />
    </React.Fragment>
  );

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        setLoading(true);
        const response = await getGymList();
        setGyms(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
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
      <GymTable
        toolbarItens={isAdmin ? adminToolbarItens : userToolbarItens}
        gyms={gyms}
        selectedGym={selectedGym}
        setSelectedGym={setSelectedGym}
      />
    );
  }
};

export default GymTab;
