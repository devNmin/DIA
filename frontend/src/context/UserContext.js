import { createContext, useState } from 'react';
// import { useHistory } from 'react-router-dom';

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  // [todo] 초기값 null로 수정해야함

  let [ipV4, setIpV4] = useState('192.168.31.180');
  let [portinput, setPort] = useState(9999);

  let contextData = {
    // user: user,
    setIpV4: setIpV4,
    ipV4: ipV4,
    setPort: setPort,
    portinput: portinput,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
