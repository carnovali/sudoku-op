import { GameBoardArray } from '../models/sudoku-game-data.model';

export const getCellClasses = (
  board: GameBoardArray,
  indexRow: number,
  indexCol: number
): any => {
  return {
    'completed-cell': board[indexRow][indexCol][0] !== null,
    'border-top-none': indexRow === 0 || indexRow === 3 || indexRow === 6,
    'border-bottom-none': indexRow === 8,
    'border-left-none': indexCol === 0,
    'border-right-none': indexCol === 8,
  };
};

export const getbaseUsedCellClass = (playerID: number | null) => {
  if (typeof playerID === 'number') {
    return {
      width: '85%',
      'aspect-ratio': '1',
      display: 'flex',
      'border-radius': '50%',
      'justify-content': 'center',
      'align-items': 'center',
      color: 'var(--bg-dark)',
    };
  } else {
    return;
  }
};

export const getColorClasses = (playerID: number | null) => {
  return {
    'player-blue': playerID === 3,
    'player-orange': playerID === 1,
    'player-red': playerID === 6,
    'player-cyan': playerID === 2,
    'player-violet': playerID === 5,
    'player-light-blue': playerID === 9,
    'player-yellow': playerID === 4,
    'player-skin': playerID === 7,
    'player-green': playerID === 8,
    'player-fuchsia': playerID === 0,
    'player-brown': playerID === 10,
    'player-pink': playerID === 11,
    'player-dark-green': playerID === 12,
    'player-marine-blue': playerID === 13,
    'player-dark': playerID === 14,
  };
};

export const getColorsByPlayerID = (playerID: number | null) => {
  let color: string = '';
  switch (playerID) {
    case 0:
      color = 'var(--player-fuchsia)';
      break;
    case 1:
      color = 'var(--player-orange)';
      break;
    case 2:
      color = 'var(--player-cyan)';
      break;
    case 3:
      color = 'var(--player-blue)';
      break;
    case 4:
      color = 'var(--player-yellow)';
      break;
    case 5:
      color = 'var(--player-violet)';
      break;
    case 6:
      color = 'var(--player-red)';
      break;
    case 7:
      color = 'var(--player-skin)';
      break;
    case 8:
      color = 'var(--player-green)';
      break;
    case 9:
      color = 'var(--player-light-blue)';
      break;
    case 10:
      color = 'var(--player-brown)';
      break;
    case 11:
      color = 'var(--player-pink)';
      break;
    case 12:
      color = 'var(--player-dark-green)';
      break;
    case 13:
      color = 'var(--player-marine-blue)';
      break;
    case 14:
      color = 'var(--player-dark)';
      break;
  }
  return color;
};

export const getCellCandidatesPositionClasses = (value: string) => {
  return {
    n1: value === '1',
    n2: value === '2',
    n3: value === '3',
    n4: value === '4',
    n5: value === '5',
    n6: value === '6',
    n7: value === '7',
    n8: value === '8',
    n9: value === '9',
  };
};
