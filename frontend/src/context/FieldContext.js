import { createContext, useState } from 'react';

const FieldContext = createContext();

export default FieldContext;

export const FieldProvider = ({ children }) => {
  const [playIndex, setPlayIndex] = useState(0);

  let contextData = {
    playIndex: playIndex,
    setPlayIndex: setPlayIndex,
  };
  return (
    <FieldContext.Provider value={contextData}>
      {children}
    </FieldContext.Provider>
  );
};
