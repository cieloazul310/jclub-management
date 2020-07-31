import React from 'react';
import AppStateContext from '../../../src/utils/AppStateContext';
import reducer, { initialAppState } from '../../../src/utils/AppState';

interface Props {
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

export default function AppStateProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialAppState);
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
}
