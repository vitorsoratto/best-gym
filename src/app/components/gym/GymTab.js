import React, { useEffect, useState } from 'react';

import { getGymList } from '../../services/api_service';
import { Button } from 'primereact/button';

import GymForm from './GymForm';
import GymTable from './GymTable';

const GymTab = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGym, setSelectedGym] = useState(null);
  const [changeGym, setChangeGym] = useState(false);

  const handleToolbarClick = (type) => {
    if (selectedGym === null && type === 'edit') {
      return;
    }

    if (selectedGym !== null && type === 'new') {
        return;
    }

    setChangeGym(true);
  };

  const toolbarItens = (
    <React.Fragment>
      <Button icon='pi pi-plus' className='mr-2' onClick={(_) => handleToolbarClick('new')} />
      <Button icon='pi pi-pencil' className='mr-2' onClick={(_) => handleToolbarClick('edit')} />
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
        toolbarItens={toolbarItens}
        gyms={gyms}
        selectedGym={selectedGym}
        setSelectedGym={setSelectedGym}
      />
    );
  }
};

export default GymTab;
