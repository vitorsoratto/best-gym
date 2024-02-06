import '../styles/Dashboard.css';

import React, { useEffect, useState } from 'react';

import { Menubar } from 'primereact/menubar';
import { TabMenu } from 'primereact/tabmenu';

import { getUserProfile } from '../services/api_service';
import { getStringToken } from '../utils/util';
import GymTab from '../components/gym/GymTab';
import CheckinTab from '../components/checkin/CheckinTab';

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
          setActiveTab(<GymTab user={response.data} />);
        }
      }
    };

    fetchData();
  }, []);

  const [user, setUser] = useState({});
  const [generalActiveIndex, setGeneralActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(null);

  const tabItens = [
    {
      label: 'Academias',
    },
    {
      label: 'Checkins',
    },
  ];

  const generalTabItem = (e) => {
    if (generalActiveIndex === e) return;
    switch (e) {
      case 0:
        setActiveTab(<GymTab user={user} />);
        break;
      case 1:
        setActiveTab(<CheckinTab />);
        break;
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
          model={tabItens}
          activeIndex={generalActiveIndex}
          onTabChange={(e) => {
            generalTabItem(e.index);
            setGeneralActiveIndex(e.index);
          }}
        />
        {activeTab}
      </div>
    </div>
  );
};

export default Dashboard;
