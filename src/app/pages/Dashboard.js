import '../styles/Dashboard.css';

import React, { useEffect, useState } from 'react';

import { Menubar } from 'primereact/menubar';
import { TabMenu } from 'primereact/tabmenu';

import { getUserProfile } from '../services/api_service';
import { getStringToken } from '../utils/util';
import GymTab from '../components/gym/GymTab';
import CheckinTab from '../components/checkin/CheckinTab';

import { getGymList, getCheckinList } from '../services/api_service';

const headerItens = [
  {
    label: 'Home',
    command: (_) => {
      window.location.href = '/';
    },
  },
  {
    label: 'Sair',
    command: (_) => {
      sessionStorage.removeItem('token');
      window.location.reload();
    },
  },
];

const Dashboard = () => {
  useEffect(() => {
    const fetchData = async () => {
      const token = getStringToken();
      if (token) {
        const response = await getUserProfile();

        if (response.status === 200) {
          setUser(response.data);
        }
      }
    };

    fetchData();
  }, []);

  const [user, setUser] = useState({});
  const [generalActiveIndex, setGeneralActiveTab] = useState(0);

  const isAdmin = user?.role === 'admin';

  const adminTabItens = [
    {
      label: 'Academias',
    },
    {
      label: 'Usuários',
    },
  ];
  
  const userTabItens = [
    {
      label: 'Academias',
    },
    {
      label: 'Checkins',
    },
  ];

  const generalTabItem = () => {
    switch (generalActiveIndex) {
      case 0:
        const gymList = getGymList().then((response) => response.data);
        return <GymTab user={user} gymList={gymList}/>;
      case 1:
        if (user.role === 'admin') {
          return (
            <div>
              <h1>Usuários</h1>
            </div>
          );
        } else return;
      case 2:
        return <CheckinTab />;
      default:
        break;
    }
  };
  return (
    <div className='container'>
      <div className='main-header'>
        <Menubar model={headerItens} start={<h1 className='main-logo'>Best Gyms</h1>} />
      </div>
      <div className='card-container' style={{ padding: '10px' }}>
        <h4>Bem-vindo, {user.name}</h4>
      </div>
      <div className='card-container' style={{ padding: '30px' }}>
        <TabMenu
          model={isAdmin ? adminTabItens : userTabItens}
          activeIndex={generalActiveIndex}
          onTabChange={(e) => setGeneralActiveTab(e.index)}
        />
        {generalTabItem()}
      </div>
    </div>
  );
};

export default Dashboard;
