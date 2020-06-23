import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";

const rows = 40;
const columns = 40;
const check = [
	[0, 1],
	[0, -1],
	[1, -1],
	[-1, 1],
	[1, 1],
	[-1, -1],
	[1, 0],
	[-1, 0],
];

export function Grid() {
	// const emptyGrid = Array(rows).fill(Array(columns).fill(false));
	const initializeGrid = () => {
		const arr = [];
		for (let i = 0; i < rows; i++) {
			arr.push(Array.from(Array(columns), () => 0));
		}
		return arr;
	};

	const [grid, setGrid] = useState(() => {
		return initializeGrid();
	});

	const [running, setRunning] = useState(false);
	const runningRef = useRef(running);
	runningRef.current = running;

	const randomizeGrid = () => {
		if (running) {
			return;
		} else {
			const arr = [];
			for (let i = 0; i < rows; i++) {
				arr.push(
					Array.from(Array(columns), () => (Math.random() > 0.8 ? 1 : 0))
				);
			}
			setGrid(arr);
		}
	};

	const rorschach = () => {
		if (running) {
			return;
		} else {
			const arr = [];
			for (let i = 0; i < rows; i++) {
				arr.push(Array.from(Array(columns), () => 0));
			}
			arr[15][19] = 1;
			arr[15][20] = 1;

			arr[16][18] = 1;
			arr[16][21] = 1;

			arr[17][19] = 1;
			arr[17][20] = 1;
			arr[17][21] = 1;

			arr[20][12] = 1;
			arr[20][13] = 1;
			arr[20][14] = 1;
			arr[20][26] = 1;
			arr[20][27] = 1;
			arr[20][28] = 1;
			setGrid(arr);
		}
	};

	const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
	// let count = 0;
    const runSimulation = useCallback(() => {
		if (!runningRef.current) {
			return;
		}
		// count += 1;
		setGrid((g) => {
			return produce(g, (gridCopy) => {
				for (let i = 0; i < rows; i++) {
					for (let k = 0; k < columns; k++) {
						let neighbors = 0;
						check.forEach(([x, y]) => {
							const newI = i + x;
							const newK = k + y;
							if (newI >= 0 && newI < rows && newK >= 0 && newK < columns) {
								neighbors += g[newI][newK];
							}
						});

						if (neighbors < 2 || neighbors > 3) {
							gridCopy[i][k] = 0;
						} else if (g[i][k] === 0 && neighbors === 3) {
							gridCopy[i][k] = 1;
						}
					}
				}
			});
		});

		setTimeout(runSimulation, 300);
	}, []);

	return (
		<section className="grid-container">
			<p>Generation = {count}</p>
			<button
				onClick={() => {
					setRunning(!running);
					if (!running) {
						runningRef.current = true;
						runSimulation();
					}
				}}
			>
				{running ? "Pause" : "Start"}
			</button>
			<button
				onClick={() => {
					if (running) {
						setRunning(false);
					}
					setGrid(initializeGrid());
				}}
			>
				Clear
			</button>
			<button
				onClick={() => {
					randomizeGrid();
				}}
			>
				Random
			</button>
			<button
				onClick={() => {
					rorschach();
				}}
			>
				Rorschach
			</button>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${columns}, 20px`,
				}}
			>
				{grid.map((rows, i) =>
					rows.map((col, k) => (
						<div
							key={`${i}, ${k}`}
							onClick={() => {
								const newGrid = produce(grid, (gridCopy) => {
									gridCopy[i][k] = grid[i][k] ? 0 : 1;
								});
								setGrid(newGrid);
							}}
							style={{
								width: 20,
								height: 20,
								backgroundColor: grid[i][k] ? `${randomColor}` : undefined,
								border: "1px solid black",
							}}
						/>
					))
				)}
			</div>
		</section>
	);
}
