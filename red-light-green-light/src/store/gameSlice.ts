import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  isGreen: boolean;
  isBlinking: boolean;
  isGameOver: boolean;
  timeLeft: number;
  playerPosition: number;
  stats: {
    wins: number;
    losses: number;
    bestTime: number | null;
  };
}

const initialState: GameState = {
  isGreen: true,
  isBlinking: false,
  isGameOver: false,
  timeLeft: 30,
  playerPosition: 0,
  stats: {
    wins: 0,
    losses: 0,
    bestTime: null,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLight: (state, action: PayloadAction<boolean>) => {
      state.isGreen = action.payload;
    },
    setBlinking: (state, action: PayloadAction<boolean>) => {
      state.isBlinking = action.payload;
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
    },
    decrementTime: (state) => {
      state.timeLeft -= 1;
    },
    updatePlayerPosition: (state, action: PayloadAction<number>) => {
      state.playerPosition = action.payload;
    },
    addWin: (state) => {
      state.stats.wins += 1;
      const currentTime = 30 - state.timeLeft;
      state.stats.bestTime = state.stats.bestTime 
        ? Math.min(state.stats.bestTime, currentTime)
        : currentTime;
    },
    addLoss: (state) => {
      state.stats.losses += 1;
    },
    resetGame: () => initialState,
  },
});

export const {
  setLight,
  setBlinking,
  setGameOver,
  decrementTime,
  updatePlayerPosition,
  addWin,
  addLoss,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;