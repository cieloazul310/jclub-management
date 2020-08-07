import React from 'react';
import AppStateContext from '../../../src/utils/AppStateContext';
import reducer, { useInitialAppState } from '../../../src/utils/AppState';

interface Props {
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

export default function AppStateProvider({ children }: Props) {
  const initialAppState = useInitialAppState();
  const [state, dispatch] = React.useReducer(reducer, initialAppState);
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
}
