import React, { createContext, useContext, useReducer } from 'react';

const StateAndDispatch = createContext(null);

export default function StateAndDispatchProvider({ children }) {

  const [state, dispatch] = useReducer((state, { type, payload }) => {
    if (type === 'SET_TIME') {
      return {
        ...state,
        timestamp: payload,
      };
    }
    return state;
  }, {
    timestamp: 'SET ME!'
  });

  return (
    <StateAndDispatch.Provider value={[state,dispatch]}>
      {children}
    </StateAndDispatch.Provider>
  );
}

export const useStateAndDispatch = () => useContext(StateAndDispatch);
