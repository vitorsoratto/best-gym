import React, { useEffect, useState } from 'react';

import { getCheckinList } from '../../services/api_service';

import CheckinTable from './CheckinTable';

const CheckinTab = () => {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckins = async () => {
      setLoading(true);
      const response = await getCheckinList();
      setCheckins(response.data);
      setLoading(false);
    };
    fetchCheckins();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return <CheckinTable checkins={checkins} />;
};

export default CheckinTab;
