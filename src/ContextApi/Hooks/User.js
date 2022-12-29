import { useEffect } from 'react';
import axios  from 'axios';
import { useState } from 'react';
import { baseURL } from '../../BaseUrl/BaseUrl';

const User = () => {
  const [agent, setAgent] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
      axios
        .get(baseURL + "/agent/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAgent(res.data.data));
    }, [token]);


  return {agent};
};

export default User;