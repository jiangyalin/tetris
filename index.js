class Original {
	constructor (dom, w = 10, h = 16) {
		const data = []
		for (let i = 0; i < h; i++) {
			const row = []
			for (let j = 0; j < w; j++) {
				row.push(false)
			}
			data.push(row)
		}
		this.data = data
		this.w = w
		this.h = h

		// 初始化背景
		const createBg = (dom, w = 10, h = 16) => {
			const block = '<div class="u-block j-block"></div>'
			let bgDom = ''
			for (let i = 0; i < w; i++) {
				for (let j = 0; j < h; j++) {
					bgDom += block
				}
			}
			dom.innerHTML = bgDom
		}

	}
	setResult = (black = [], white = []) => {
		black.forEach(item => {
			this.data[item.y + 1][item.x + 1] = true
		})
		white.forEach(item => {
			this.data[item.y + 1][item.x + 1] = false
		})
	}
}

const original = new Original(document.querySelector('.j-box'))

const init = (dom) => {
	document.querySelector('.j-box').innerHTML = '<p>f</p>'
}

// 初始化背景
const createBg = (dom, w = 10, h = 16) => {
	const block = '<div class="u-block j-block"></div>'
	let bgDom = ''
	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			bgDom += block
		}
	}
	dom.innerHTML = bgDom
}

// 设置显示内容
const setResult = (original = Original, black = [], white = []) => {
}

init()
createBg(document.querySelector('.j-box'))
console.log('original', original)
