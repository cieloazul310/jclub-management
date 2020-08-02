export interface AppState {
  displayFullAttd: boolean;
}

export const initialAppState: AppState = {
  displayFullAttd: false,
};

export type Action = { type: 'TOGGLE_FULL_ATTD' } | { type: 'RESET' };

export default function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case 'TOGGLE_FULL_ATTD':
      return {
        ...state,
        displayFullAttd: !state.displayFullAttd,
      };
    case 'RESET':
      return initialAppState;
    default:
      throw new Error();
  }
}
