export interface AppState {}

export const initialAppState: AppState = {};

export type Action = { type: 'RESET' };

export default function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case 'RESET':
      return initialAppState;
    default:
      throw new Error();
  }
}
