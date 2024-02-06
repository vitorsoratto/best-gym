import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';

import React, { useState } from 'react';

import { saveGym, editGym } from '../../services/api_service';
import { Message } from 'primereact/message';

const GymForm = ({ gym, setChangeGym }) => {
  const toast = React.createRef();
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const handleSubmit = async () => {
    setFailed(false);

    if (
      gymValue.name?.trim() === '' ||
      gymValue.latitude?.trim() === '' ||
      gymValue.longitude?.trim() === '' ||
      gymValue.phone?.trim() === '' ||
      gymValue.description?.trim() === ''
    ) {
      setFailed(true);
      return;
    }

    if (gym?.id) {
      // edit
      const response = await editGym(gym.id, gymValue);

      if (response.status === 200) {
        setChangeGym(false);
        window.location.reload();
      } else {
        showToast('error', 'Erro', 'Erro ao editar academia');
      }
    } else {
      const response = await saveGym(gymValue);

      if (response.status === 201) {
        setChangeGym(false);
        window.location.reload();
      } else {
        showToast('error', 'Erro', 'Erro ao salvar academia');
      }
    }
  };

  const [gymValue, setGymValue] = useState(
    gym ? gym : { name: '', phone: '', description: '', latitude: '', longitude: '' }
  );
  const [failed, setFailed] = useState(false);

  return (
    <div>
      <Toast ref={toast} />
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
          {failed && gymValue.name?.trim() === "" && (
            <Message className='message' severity='error' text='O nome é obrigatório' />
          )}
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
          {failed && gymValue.phone?.trim() === "" &&(
            <Message className='message' severity='error' text='O telefone é obrigatório' />
          )}
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
          {failed && gymValue.description?.trim() === "" && (
            <Message className='message' severity='error' text='A descrição é obrigatória' />
          )}
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
          {failed && gymValue.latitude?.trim() === "" && (
            <Message className='message' severity='error' text='A latitude é obrigatório' />
          )}
        </div>

        <div className='field col-12 md:col-6'>
          <label htmlFor='long'>Longitude</label>
          <InputText
            className='w-full'
            id='long'
            onChange={(e) => setGymValue({ ...gymValue, longitude: e.target.value })}
            value={gymValue.longitude ? gymValue.longitude : ''}
          />
          {failed && gymValue.longitude?.trim() === "" && (
            <Message className='message' severity='error' text='A longitude é obrigatório' />
          )}
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
