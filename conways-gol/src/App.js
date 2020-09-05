import React from "react";
import "./App.css";
import { Grid } from "./grid/Grid";

function App() {
	return (
		<div className="App">
			<h1>Conway's Game of Life</h1>
			<Grid />
			<section class="main-text">
				<div className="rules-container">
					<h2>The Rules</h2>
					<ul>
						<li>Any live cell with 2 or 3 live neighbors survives</li>
						<li>
							Dead cells with 3 live neighbors becomes a live cell
						</li>
						<li>All other live cells die in the next generation</li>
					</ul>
				</div>
				<div className="description-container">
					<h2>Cellular Automata</h2>
					<p>
						Conway's Game of Life is charactarized by a simple rule set that
						changes the value in a cell on the grid over time, which can create
						some very complex scenarios. Given a large enough grid and enough
						time, anything computable can be computed in The Game of Life -
						meaning it is "Turing Complete"
					</p>
				</div>
			</section>
		</div>
	);
}

export default App;
