import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";
import {
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";


export function Grid() {
	// GRID SIZE
	const rows = 50;
	const columns = 50;
	const check = [
		[-1, 1],
		[-1, -1],
		[-1, 0],
		[0, 1],
		[0, -1],
		[1, -1],
		[1, 1],
		[1, 0],
	];
	
	// STATE
	const initGrid = Array(rows).fill(Array(columns).fill(0));
	const [grid, setGrid] = useState(initGrid);
	const [running, setRunning] = useState(false);
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);
	const runningRef = useRef(running);
	runningRef.current = running;

	// PRESETS
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
				arr.push(Array.from(Array(columns).fill(0)));
			}
			arr[15][24] = 1;
			arr[15][25] = 1;

			arr[16][23] = 1;
			arr[16][26] = 1;

			arr[17][24] = 1;
			arr[17][25] = 1;
			arr[17][26] = 1;

			arr[20][17] = 1;
			arr[20][18] = 1;
			arr[20][19] = 1;
			arr[20][31] = 1;
			arr[20][32] = 1;
			arr[20][33] = 1;
			setGrid(arr);
		}
	};

	const collision = () => {
		if (running) {
			return;
		} else {
			const arr = [];
			for (let i = 0; i < rows; i++) {
				arr.push(Array.from(Array(columns), () => 0));
			}
			arr[0][1] = 1;
			arr[0][48] = 1;

			arr[1][2] = 1;
			arr[1][47] = 1;

			arr[2][0] = 1;
			arr[2][1] = 1;
			arr[2][2] = 1;
			arr[2][47] = 1;
			arr[2][48] = 1;
			arr[2][49] = 1;

			arr[24][24] = 1;
			arr[24][25] = 1;
			arr[25][24] = 1;
			arr[25][25] = 1;

			arr[49][1] = 1;
			arr[49][48] = 1;

			arr[48][2] = 1;
			arr[48][47] = 1;

			arr[47][0] = 1;
			arr[47][1] = 1;
			arr[47][2] = 1;
			arr[47][47] = 1;
			arr[47][48] = 1;
			arr[47][49] = 1;

			setGrid(arr);
		}
	};

	// const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
	let count = 0;

	// GAME LOGIC
	const startGame = useCallback(() => {
		if (!runningRef.current) {
			return;
		}
		setGrid((original) => {
			return produce(original, (gridCopy) => {
				for (let i = 0; i < rows; i++) {
					for (let j = 0; j < columns; j++) {
						let neighbors = 0;
						check.forEach(([x, y]) => {
							const newI = i + x;
							const newK = j + y;
							if (newI >= 0 && newI < rows && newK >= 0 && newK < columns) {
								neighbors += original[newI][newK];
							}
						});
						if (neighbors < 2 || neighbors > 3) {
							gridCopy[i][j] = 0;
						} else if (original[i][j] === 0 && neighbors === 3) {
							gridCopy[i][j] = 1;
						}
					}
				}
			});
		});

		setTimeout(startGame, 100);
	}, []);

	return (
		<section className="grid-container">
			<ButtonDropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret color="primary">
					Presets
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem
						onClick={() => {
							rorschach();
						}}
					>
						Rorschach
					</DropdownItem>
					<DropdownItem
						onClick={() => {
							collision();
						}}
					>
						Collision
					</DropdownItem>
					<DropdownItem
						onClick={() => {
							randomizeGrid();
						}}
					>
						Random
					</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
			<div>
				<p>Generation = {count}</p>
				<button
					onClick={() => {
						setRunning(!running);
						if (!running) {
							runningRef.current = true;
							startGame();
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
						setGrid(initGrid);
					}}
				>
					Clear
				</button>
			</div>
			<div
				className="grid-box"
			>
				{grid.map((rows, i) =>
					rows.map((col, j) => (
						<div
							className={grid[i][j] ? "active-cells" : "dead-cells"}
							key={`${i}, ${j}`}
							onClick={() => {
								if (running) {
									return;
								} else {
									const newGrid = produce(grid, (gridCopy) => {
										gridCopy[i][j] = grid[i][j] ? 0 : 1;
									});
									setGrid(newGrid);
									// console.log(grid);
								}
							}}
						/>
					))
				)}
			</div>
		</section>
	);
}
