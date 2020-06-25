import React, { useState, useRef } from "react";
import produce from "immer";
import {
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
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
	const [dropdownOpenColor, setOpenColor] = useState(false);
	const toggleColor = () => setOpenColor(!dropdownOpenColor);
	const runningRef = useRef(running);
	runningRef.current = running;
	let [count, setCount] = useState(0);
	const [color, setColor] = useState("red");

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
			setCount(0);
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
			setCount(0);
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
			arr[1][2] = 1;
			arr[1][47] = 1;

			arr[2][3] = 1;
			arr[2][46] = 1;

			arr[3][1] = 1;
			arr[3][2] = 1;
			arr[3][3] = 1;
			arr[3][46] = 1;
			arr[3][47] = 1;
			arr[3][48] = 1;

			arr[24][24] = 1;
			arr[24][25] = 1;
			arr[25][24] = 1;
			arr[25][25] = 1;

			arr[47][3] = 1;
			arr[47][46] = 1;

			arr[48][2] = 1;
			arr[48][47] = 1;

			arr[46][1] = 1;
			arr[46][2] = 1;
			arr[46][3] = 1;
			arr[46][46] = 1;
			arr[46][47] = 1;
			arr[46][48] = 1;

			setGrid(arr);
			setCount(0);
		}
	};

	// COUNTER
	setTimeout(() => {
		if (runningRef.current) {
			setCount(count + 1);
		} else {
			return;
		}
	}, 100);

	// GAME LOOP
	const startGame = () => {
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
						// Dead Edges
						gridCopy[0][j] = 0;
						gridCopy[49][j] = 0;
						gridCopy[i][0] = 0;
						gridCopy[i][49] = 0;
					}
				}
			});
		});
		setTimeout(startGame, 100);
	};

	return (
		<section className="grid-container">
			<div className="drop-down">
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
				<ButtonDropdown
					direction="left"
					isOpen={dropdownOpenColor}
					toggle={toggleColor}
				>
					<DropdownToggle
						caret
						style={{ color: `${color}`, backgroundColor: "#383838" }}
					>
						Color Picker
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem
							onClick={() => {
								setColor("red");
							}}
						>
							Red
						</DropdownItem>
						<DropdownItem
							onClick={() => {
								setColor("lightskyblue");
							}}
						>
							Blue
						</DropdownItem>
						<DropdownItem
							onClick={() => {
								setColor("lightgreen");
							}}
						>
							Green
						</DropdownItem>
						<DropdownItem
							onClick={() => {
								setColor("pink");
							}}
						>
							Pink
						</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</div>
			<div>
				<p>Generation = {count}</p>
				<button
					className="button"
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
					className="button"
					onClick={() => {
						if (running) {
							setRunning(false);
						}
						setGrid(initGrid);
						setCount(0);
					}}
				>
					Clear
				</button>
			</div>
			<div className="grid-box">
				{grid.map((rows, i) =>
					rows.map((col, j) => (
						<div
							className="cells"
							style={{
								backgroundColor: grid[i][j] ? `${color}` : undefined,
								border: grid[i][j] ? "1px solid black" : undefined
							}}
							key={`${i}, ${j}`}
							onClick={() => {
								if (running) {
									return;
								} else {
									const newGrid = produce(grid, (gridCopy) => {
										gridCopy[i][j] = grid[i][j] ? 0 : 1;
									});
									setGrid(newGrid);
									console.log(grid);
								}
							}}
						/>
					))
				)}
			</div>
		</section>
	);
}
