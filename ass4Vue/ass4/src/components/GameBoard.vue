<!-- GameBoard.vue -->
<script setup>
import { ref, computed } from 'vue';
import { create, move } from '@/logic/logic';

class CyclicGenerator {
  sequence;
  index;

  constructor(sequence) {
    this.sequence = sequence;
    this.index = 0;
  }

  next() {
    const n = this.sequence.charAt(this.index);
    this.index = (this.index + 1) % this.sequence.length;
    return n;
  }
}

const GameboardState = ref({
  board: null,
  effects: [],
  generator: null,
  score: 0,
  gameStatus: 'Not Started',
  errorGameMSG: '',
});

const selectedTiles = ref([]);

function createGame() {
  console.log("Clicked");
  const generator = new CyclicGenerator('ABC');
  const board = create(generator, 8, 8);
  GameboardState.value.board = board;
  GameboardState.value.generator = generator;
  console.log(board);
}

function handleCellClick(row, col) {
  const newSelectedTiles = [...selectedTiles.value, { row, col }];
  if (newSelectedTiles.length === 2) {
    const [first, second] = newSelectedTiles;
    const result = move(GameboardState.value.generator, GameboardState.value.board, first, second);
    selectedTiles.value = [];
    if (result.effects && Array.isArray(result.effects)) {
      result.effects.forEach(effect => {
        if (effect.kind === 'Match') {
          GameboardState.value.score += 10;
        }
      });
    }
  } else {
    selectedTiles.value = newSelectedTiles;
  }
}

const renderTiles = computed(() => {
  if (!GameboardState.value.board) return [];
  const { width, height, tiles } = GameboardState.value.board;
  let rows = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      const index = i * width + j;
      const isSelected = selectedTiles.value.some(tile => tile.row === i && tile.col === j);
      row.push({
        index,
        isSelected,
        tile: tiles[index],
        row: i,
        col: j,
      });
    }
    rows.push({
      index: i,
      tiles: row,
    });
  }
  return rows;
});
</script>

<template>
  <div>Score: {{ GameboardState.score }}</div>
  <button type="button" @click="createGame" class="create-game-button">Create Game</button>
  <div v-if="GameboardState.board" class="game-board">
    <div v-for="row in renderTiles" :key="row.index" class="row">
      <button 
        v-for="tile in row.tiles" 
        :key="tile.index" 
        @click="handleCellClick(tile.row, tile.col)"
        :class="['tile', { selected: tile.isSelected }]"
      >
        {{ tile.tile }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.create-game-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-game-button:hover {
  background-color: #45a049;
}

.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.row {
  display: flex;
}

.tile {
  width: 40px;
  height: 40px;
  margin: 2px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.tile.selected {
  background-color: #ffeb3b;
  border-color: #fbc02d;
}
</style>
