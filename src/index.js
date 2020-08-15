import React, { useEffect } from 'react'
import { Button } from 'antd'
// import { hello } from './hello'
const { hello } = require('./hello')
import hello2 from './hello'
import { useToggle } from 'ahooks'

export const App = () => {
	const [state, { toggle }] = useToggle()

	const onClick = () => {
		console.log('React')
	}
	useEffect(() => {
		console.log(hello)
		console.log(hello2)
	})
	return <Button onClick={onClick}>React</Button>
}

// const fn = () => {
// 	console.log('a')
// }

// const list = [1, 2, 3]
// for (let i of list) {
// 	console.log(i)
// }

// class React {
// 	constructor() {
// 		this.name = 'react'
// 	}
// 	init() {
// 		console.log(this.name)
// 	}
// }

// const react = new React()
// react.init()

// class Vue {
// 	constructor() {
// 		this.name = 'vue'
// 	}
// 	init() {
// 		console.log(this.name)
// 	}
// }

// const vue = new Vue()
// vue.init()
// const isHas = [1, 2, 3].includes(2)

// const result = new Promise((resovle, reject) => {
// 	resovle('success')
// })

// const fetchData = async () => {
// 	const a = await result()
// 	console.log(a)
// }
