const cells = document.querySelectorAll('.game-cell')
const gameField = document.querySelector('.game-field')
const body = document.querySelector('.body')
const retry = document.querySelector('.retry')
const results = document.querySelector('.results')
leaderboard = []


let stepsCount = 0
let winCountx = 0
let winCounto = 0
let xoFlag = 'x'
let gameStatex = []
let gameStateo = []
gameActive = true

const winningConditions = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
];

const winTextCreate = () => {
	const winText = document.createElement("div");
	winText.style.fontSize = "36px";
	winText.textContent = "Player " + xoFlag.toUpperCase() + " wins in " + stepsCount + " moves!";
	winText.style.color = "#5372a0";
	winText.style.userSelect = "none"
	winText.style.marginTop = "50px"
	winText.classList.add('wintext')
	body.appendChild(winText)
	leaderboard.unshift(winText.textContent)
	localStorage.setItem(1, leaderboard[0])
	const li = document.createElement("li")
	li.textContent = localStorage.getItem(1)
	results.appendChild(li)
	if (leaderboard.length > 10) {
		results.removeChild(results.firstChild)
	}
}

const createXO = (event) => {
	const x = document.createElement("div");
	x.style.fontSize = "80px";
	x.textContent = "╳";
	x.style.color = "#5372a0";
	x.style.userSelect = "none"

	const o = document.createElement("div");
	o.style.fontSize = "88px";
	o.textContent = "◯";
	o.style.color = "#5372a0";
	o.style.paddingTop = "10px";
	o.style.userSelect = "none"

	if ((event.target.classList.contains("game-cell")) && (event.target.classList.contains('marked') === false) && (gameActive === true)) {
		if (xoFlag === "x") {
			event.target.appendChild(x)
			stepsCount++
			event.target.classList.add('marked')
			xoFlag = "o"
			gameStatex.push(Number(event.target.className[0]))
			for (let condition of winningConditions) {
				if (gameActive === true) {
					for (let n of condition) {
						for (let n2 of gameStatex) {
							if (n === n2) {
								winCountx += 1
								if (winCountx === 3) {
									gameActive = false
									xoFlag = 'X'
									winTextCreate()
								}
							}
						}
					}
				}
				winCountx = 0
			}
		}
		else if (xoFlag === "o") {
			event.target.appendChild(o)
			stepsCount++
			xoFlag = "x"
			event.target.classList.add('marked')
			gameStateo.push(Number(event.target.className[0]))
			for (let condition of winningConditions) {
				if (gameActive === true) {
					for (let n of condition) {
						for (let n2 of gameStateo) {
							if (n === n2) {
								winCounto += 1
								if (winCounto === 3) {
									gameActive = false
									xoFlag = 'O'
									winTextCreate()
								}
							}
						}
					}
				}
				winCounto = 0
			}
		}
	}
	if ((gameActive === true) && (stepsCount === 9)) {
		const tie = document.createElement("div");
		tie.style.fontSize = "36px";
		tie.textContent = "Tie";
		tie.style.color = "#5372a0";
		tie.style.userSelect = "none"
		tie.style.marginTop = "50px"
		tie.classList.add('wintext')
		gameActive = false
		body.appendChild(tie)
		leaderboard.unshift(tie.textContent)
		localStorage.setItem(1, leaderboard[0])
		const li = document.createElement("li")
		li.textContent = localStorage.getItem(1)
		results.appendChild(li)
		if (leaderboard.length > 10) {
			results.removeChild(results.firstChild)
		}
	}
}

const retryFunc = () => {
	for (i of cells) {
		while (i.firstChild) {
			i.removeChild(i.firstChild)
		}
		while (i.classList.contains('marked')) {
			i.classList.remove('marked')
		}
		stepsCount = 0
		winCountx = 0
		winCounto = 0
		xoFlag = 'x'
		gameStatex = []
		gameStateo = []
		gameActive = true
		if (document.querySelector('.wintext')) {
			body.removeChild(document.querySelector('.wintext'))
		}
		if (document.querySelector('.tie')) {
			body.removeChild(document.querySelector('.tie'))
		}
	}
}

gameField.addEventListener('click', createXO)
retry.addEventListener('click', retryFunc)