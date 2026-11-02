import React, { createContext, useContext } from 'react';

/**
 * True once the preloader has handed over. Hero choreography waits on this so the
 * entrance is actually seen rather than playing behind the loading panel.
 */
const EntranceContext = createContext(true);

export function EntranceProvider({
  ready,
  children



}: {ready: boolean;children: React.ReactNode;}) {
  return <EntranceContext.Provider value={ready}>{children}</EntranceContext.Provider>;
}

export function useEntranceReady() {
  return useContext(EntranceContext);
}