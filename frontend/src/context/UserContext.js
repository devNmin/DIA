import { createContext, useState } from 'react';
// import { useHistory } from 'react-router-dom';

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({children}) => {
    let [ipV4, setIpV4] = useState(null)

    let contextData = {
        // user: user,
        setIpV4 : setIpV4,
        ipV4 : ipV4,
      };
    return <UserContext.Provider value={contextData}>{children}</UserContext.Provider>;
}