import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';

import React, { useState } from 'react';

import { saveGym, editGym } from '../../services/api_service';

const GymForm = ({ gym, setChangeGym }) => {
  const handleSubmit = async () => {
    if (gym?.id) {
      // edit
      const response = await editGym(gym.id, gymValue);
    } else {
      const response = await saveGym(gymValue);

      if (response.status === 201) {
        setChangeGym(false);
      }
    }
  };

  const [gymValue, setGymValue] = useState(gym ? gym : {});

  const [nameValue, setNameValue] = useState(gym ? gym.name : '');
  const [phoneValue, setPhoneValue] = useState(gym ? gym.phone : '');
  const [descriptionValue, setDescriptionValue] = useState(gym ? gym.description : '');
  const [latValue, setLatValue] = useState(gym ? gym.latitude : '');
  const [longValue, setLongValue] = useState(gym ? gym.longitude : '');

  return (
    <div>
      <h1>Form</h1>
      <p>{gym ? gym.name : 'Nova academia'}</p>

      <div className='formgrid grid'>
        <div className='field col-12 md:col-10'>
          <label htmlFor='name'>Nome</label>
          <InputText
            className='w-full'
            id='name'
            type='text'
            onChange={(e) => setGymValue({ ...gymValue, name: e.target.value })}
            value={gymValue.name ? gymValue.name : ''}
          />
        </div>

        <div className='field col-12 md:col-2'>
          <label htmlFor='phone'>Telefone</label>
          <InputMask
            className='w-full'
            id='phone'
            mask='(99) 99999-9999'
            onChange={(e) => setGymValue({ ...gymValue, phone: e.target.value })}
            value={gymValue.phone ? gymValue.phone : ''}
          />
        </div>

        <div className='field col-12'>
          <label htmlFor='description'>Descrição</label>
          <InputTextarea
            autoResize
            className='w-full'
            id='description'
            type='text'
            onChange={(e) => setGymValue({ ...gymValue, description: e.target.value })}
            value={gymValue.description ? gymValue.description : ''}
            maxLength={250}
          />
        </div>

        <div className='field col-12 md:col-6'>
          <label htmlFor='lat'>Latitude</label>
          <InputText
            className='w-full'
            id='lat'
            type='text'
            onChange={(e) => setGymValue({ ...gymValue, latitude: e.target.value })}
            value={gymValue.latitude ? gymValue.latitude : ''}
          />
        </div>

        <div className='field col-12 md:col-6'>
          <label htmlFor='long'>Longitude</label>
          <InputText className='w-full' id='long'
            onChange={(e) => setGymValue({ ...gymValue, longitude: e.target.value })}
            value={gymValue.longitude ? gymValue.longitude : ''}
          />
        </div>

        <div className='mt-2'>
          <Button
            className='mr-2'
            severity='success'
            label='Salvar'
            onClick={(_) => handleSubmit()}
          />
          <Button label='Voltar' severity='secondary' onClick={(_) => setChangeGym(false)} />
        </div>
      </div>
    </div>
  );
};

export default GymForm;
