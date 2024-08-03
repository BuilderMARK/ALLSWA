export class Position {
    constructor(row, col) {
      this.row = row;
      this.col = col;
    }
  }
  
  export class Match {
    constructor(matched, positions) {
      this.matched = matched;
      this.positions = positions;
    }
  }
  
  export class Board {
    constructor(width, height, tiles) {
      this.width = width;
      this.height = height;
      this.tiles = tiles;
    }
  }
  
  export class Effect {
    constructor(kind, match) {
      this.kind = kind;
      this.match = match;
    }
  }
  
  export class Generator {
    constructor(generatorFunction) {
      this.generatorFunction = generatorFunction;
    }
  
    next() {
      return this.generatorFunction();
    }
  }
  
  export function create(generator, width, height) {
    const tiles = [];
    for (let i = 0; i < width * height; i++) {
      tiles.push(generator.next());
    }
    return new Board(width, height, tiles);
  }
  
  export function positions(board) {
    const positions = [];
    for (let row = 0; row < board.height; row++) {
      for (let col = 0; col < board.width; col++) {
        positions.push(new Position(row, col));
      }
    }
    return positions;
  }
  
  export function piece(board, position) {
    if (
      position.row < 0 ||
      position.row >= board.height ||
      position.col < 0 ||
      position.col >= board.width
    ) {
      return undefined;
    }
    return board.tiles[position.row * board.width + position.col];
  }
  
  export function matchCheck(board, first, second) {
    if (
      board.tiles[first.row * board.width + first.col] ===
      board.tiles[second.row * board.width + second.col]
    ) {
      console.log("hej", first, second);
      return new Match(
        board.tiles[first.row * board.width + first.col],
        [first, second]
      );
    } else {
      return new Match(undefined, []);
    }
  }
  
  export function invalidMovesCheck(first, second) {
    //Sikre at man ikke kan lave moves på forskellige rows og cols
    if (first.row !== second.row && first.col !== second.col) {
      return true;
    } else {
      return false;
    }
  }
  
  export function canMove(board, first, second) {
    if (
      !isPositionWithinBoardBounds(board, first) ||
      !isPositionWithinBoardBounds(board, second) ||
      matchCheck(board, first, second).matched !== undefined || // Sikre man ikke må move en tile hvis ikke det resultere i et match
      invalidMovesCheck(first, second) //Sikre at man ikke kan lave moves på forskellige rows og cols - aka skråt
    ) {
      return false;
    }
    return true;
  }
  
  function isPositionWithinBoardBounds(board, position) {
    const isRowValid = position.row >= 0 && position.row < board.height;
    const isColValid = position.col >= 0 && position.col < board.width;
  
    return isRowValid && isColValid;
  }
  
  export function move(generator, board, first, second) {
    if (!canMove(board, first, second)) {
      return { board, effects: [] };
    }
  
    const effects = [];
  
    // Swap the tiles
    const firstTile = board.tiles[first.row * board.width + first.col];
    const secondTile = board.tiles[second.row * board.width + second.col];
    board.tiles[first.row * board.width + first.col] = secondTile;
    board.tiles[second.row * board.width + second.col] = firstTile;
  
    let matchesFound = true;
  
    while (matchesFound) {
      const matches = findMatches(board);
  
      if (matches.length > 0) {
        const positionsToRemove = new Set();
  
        for (let match of matches) {
          effects.push(new Effect("Match", match));
  
          // Mark matched tiles for removal
          for (let position of match.positions) {
            positionsToRemove.add(`${position.row}-${position.col}`);
          }
        }
  
        // Shift tiles down and replace matched tiles
        for (let col = 0; col < board.width; col++) {
          let emptyRow = board.height - 1;
          for (let row = board.height - 1; row >= 0; row--) {
            const positionKey = `${row}-${col}`;
            if (!positionsToRemove.has(positionKey)) {
              if (row !== emptyRow) {
                board.tiles[emptyRow * board.width + col] =
                  board.tiles[row * board.width + col];
              }
              emptyRow--;
            }
          }
  
          // Fill the empty spaces with new tiles
          while (emptyRow >= 0) {
            board.tiles[emptyRow * board.width + col] = generator.next();
            emptyRow--;
          }
        }
  
        effects.push(new Effect("Refill"));
      } else {
        matchesFound = false;
      }
    }
  
    return { board, effects };
  }
  
  function findMatches(board) {
    const matches = [];
  
    // Check horizontal matches
    for (let row = 0; row < board.height; row++) {
      let match = new Match(undefined, []);
      for (let col = 0; col < board.width; col++) {
        const position = new Position(row, col);
        const tile = piece(board, position);
        if (tile === match.matched) {
          match.positions.push(position);
        } else {
          if (match.positions.length >= 3) {
            matches.push(match);
          }
          match = new Match(tile, [position]);
        }
      }
      if (match.positions.length >= 3) {
        matches.push(match);
      }
    }
  
    // Check vertical matches
    for (let col = 0; col < board.width; col++) {
      let match = new Match(undefined, []);
      for (let row = 0; row < board.height; row++) {
        const position = new Position(row, col);
        const tile = piece(board, position);
        if (tile === match.matched) {
          match.positions.push(position);
        } else {
          if (match.positions.length >= 3) {
            matches.push(match);
          }
          match = new Match(tile, [position]);
        }
      }
      if (match.positions.length >= 3) {
        matches.push(match);
      }
    }
  
    return matches;
  }
  