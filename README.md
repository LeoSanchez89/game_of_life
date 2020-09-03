# Cellular Automata and Conway's "Game of Life"
Recreating John Conway's iconic 1970's Game of Life using React. Turing complete game that relies on cellular automata to function. It follows a simple set of rules to decide which cells live on or die in the next generation!

![Gosper's Glider Gun](https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif)
![Pulsar](https://upload.wikimedia.org/wikipedia/commons/0/07/Game_of_life_pulsar.gif)
![Examples](https://camo.githubusercontent.com/a710386de69bcb8577875246196c7fb07144ff0c/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f3456565a547654717a5252304255774e49482f67697068792e676966)


The Rules:
<ul>
  <li>Any live cell with two or three live neighbours survives</li>
  <li>Any dead cell with three live neighbours becomes a live cell</li>
  <li>All other live cells die in the next generation</li>
</ul>

Features:
<ul>
  <li>Grid of cells, 50 x 50 that can each be toggled to be alive or dead</li>
  <li>Includes a text area that shows the current generation of cells being displayed</li>
  <li>Display includes start/pause/clear buttons to hault the animation and clear the grid</li>
  <li>Includes drop-downs for choice of grid presets and cell colors</li>
  <li>Algorithm enforces the 3 fundamental game rules to generate new generations of cells</li>
  <li>Implements buffer using Immer to modify grid state</li>
  <li>All edge cells along the perimeter are permanently dead</li>
</ul>


