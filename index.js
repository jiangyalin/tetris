class Original {
	constructor (dom, w = 10, h = 16) {
		const data = []
		for (let i = 0; i < h; i++) {
			const row = []
			for (let j = 0; j < w; j++) {
				row.push({
					status: false,
					move: false
				})
			}
			data.push(row)
		}
		this.data = data
		this.newBlock = this.createBlock() // 块组
		this.w = w
		this.h = h

		this.createBg(dom, this.w, this.h)


		setInterval(() => {
		// 	for (let i = 0; i < 2; i++) {
			if (!this.checkGg()) {
				const checkOnTheMove = !this.newBlock.isEnd // 检查是否存在未停止移动的元素
				if (!checkOnTheMove) {
					this.newBlock = this.createBlock()
				}
				this.landing(this.newBlock)
				const blackArr = this.blockToBlack(this.newBlock)
				this.painting(blackArr, this.newBlock.isEnd)
			}
			// }
		}, 1000 * 5)
	}

	// 创建背景
	createBg = (dom, w = 10, h = 16) => {
		const block = '<div class="u-block j-block"></div>'
		let bgDom = ''
		for (let i = 0; i < w; i++) {
			for (let j = 0; j < h; j++) {
				bgDom += block
			}
		}
		dom.innerHTML = bgDom
	}

	// 创建方块(type T, L, I, O)
	createBlock = () => {
		// 生成从minNum到maxNum的随机数
		const randomNum = (minNum, maxNum) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)

		const type = ['T', 'L', 'I', 'O']
		// const type = ['T', 'T', 'L', 'L']

		return {
			type: type[randomNum(0, 3)], // 类型
			direction: 't', // 方向
			coordinate: { // 坐标
				x: 4,
				y: -1
			},
			isEnd: false // 是否已落地
		}
	}

	// 降落
	landing = (newBlock = {}) => {
		const block = newBlock
		block.coordinate.y = block.coordinate.y + 1
		// 触底了
		const isBottomedOut = block.coordinate.y >= (this.h - 1)

		const blackArr = this.blockToBlack(newBlock)

		// 碰触到底部方块
		const isCollision = blackArr
			.filter(item => item.x >= 0 && item.y >= 0)
			.filter(item => item.x < this.w && item.y < (this.h - 1))
			.find(item => this.data[item.y + 1][item.x].status && !this.data[item.y + 1][item.x].move)

		if (isBottomedOut || isCollision) block.isEnd = true
	}

	// 方块转黑数组([{ type: 'T', direction: 't', coordinate: { x: 4, y: 0 } }])
	blockToBlack = (newBlock = {}) => {
		const map = {
			T: {
				t: [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
				l: [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }],
				b: [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }],
				r: [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }]
			},
			L: {
				t: [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
				l: [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }],
				b: [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 1 }],
				r: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }]
			},
			I: {
				t: [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
				l: [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }],
				b: [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
				r: [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }]
			},
			O: {
				t: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }],
				l: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }],
				b: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }],
				r: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }]
			}
		}
		const painting = []
		const blockGroup = map[newBlock.type][newBlock.direction]
		blockGroup.forEach(node => {
			painting.push({
				x: newBlock.coordinate.x + node.x,
				y: newBlock.coordinate.y + node.y
			})
		})

		return painting
	}

	// 画
	painting = (blackList = [], isEnd) => {
		this.data.forEach(item => {
			item.forEach(node=> {
				if (node.move) {
					node.move = false
					node.status = false
				}
			})
		})

		blackList
			.filter(item => item.x >= 0 && item.y >= 0)
			.filter(item => item.x < this.w && item.y < this.h)
			.forEach(item => {
				this.data[item.y][item.x].status = true
				this.data[item.y][item.x].move = !isEnd
			})

		this.data.forEach((item, y) => {
			item.forEach((node, x) => {
				if (node.status) document.querySelectorAll('.j-block')[y * this.w + x].classList.add('s-black')
				if (!node.status) document.querySelectorAll('.j-block')[y * this.w + x].classList.remove('s-black')
			})
		})
	}

	// 检查是否已结束
	checkGg = () => Boolean(this.data[0].find(item => item.status && !item.move))

	// 旋转方块
	rotate = () => {
		const list = ['t', 'r', 'b', 'l']
		this.newBlock.direction = list[[...list, ...list].findIndex(item => item === this.newBlock.direction) + 1]
		const blackArr = this.blockToBlack(this.newBlock)
		this.painting(blackArr, this.newBlock.isEnd)
	}
}

const original = new Original(document.querySelector('.j-box'))

console.log('original', original)

document.onkeydown = event => {
	console.log('event', event)
	if (event.key === 'ArrowUp') original.rotate()
	event.preventDefault()
}
