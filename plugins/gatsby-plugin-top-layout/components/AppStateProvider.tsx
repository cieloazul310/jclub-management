import * as React from 'react';
import AppStateContext from '../../../src/utils/AppStateContext';
import reducer, { useInitialAppState } from '../../../src/utils/AppState';

interface Props {
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  isMobile: boolean;
}

export default function AppStateProvider({ children, isMobile }: Props) {
  const initialAppState = useInitialAppState(isMobile);
  const [state, dispatch] = React.useReducer(reducer, initialAppState);
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
}
