
import React, { createContext, useState } from 'react';

export const initialState = {
  ui: {
    reload: {
      topRight: false,
      topLeft: false,
    }
  }
};

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [context, setGlobalContext] = useState(initialState);

  const reloadUi = async (area) => {
    await setGlobalContext({
      ...context,
      ui: {
        ...context.ui, 
        reload: { ...context.ui.reload, [area]: true }
      }
    })
    
    await setGlobalContext({
      ...context,
      ui: {
        ...context.ui,
        reload: { ...context.ui.reload, [area]: false }
      }
    })
  }
  
  return (
    <GlobalContext.Provider
      value={{
        context,
        reloadUi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
