'use stict'

const todoItems = []

const todoList = document.getElementById('list')
const input = document.getElementById('new-list-item')

const addNewTodo = (value) => {
	const li              = document.createElement('li')
	const checkmark       = document.createElement('span')
	const checkmarkRing   = document.createElement('img')
	const checkmarkCheck  = document.createElement('img')
	const p               = document.createElement('p')

	checkmarkRing.setAttribute('src', './src/svg/circle_ic.svg')
	checkmarkRing.classList.add('card__checkmark-ring')

	checkmarkCheck.setAttribute('src', './src/svg/checkmark_ic.svg')
	checkmarkCheck.classList.add('card__checkmark-check' ,'card__checkmark-check--hidden')

	checkmark.appendChild(checkmarkRing)
	checkmark.appendChild(checkmarkCheck)
	checkmark.classList.add('card__checkmark', 'clickable')

	li.appendChild(checkmark)

	p.innerText = value
	p.classList.add('clickable')
	p.classList.add('card__p')
	li.appendChild(p)

	li.classList.add('card')

	const checkTarget = (event) => {
		return new Promise(resolve => {
			const tag = event.target.tagName
			if (tag === "P" || tag === "IMG") {
				resolve(true)
			} else {
				resolve(false)
			}
		})
	}

	li.addEventListener('mouseover', e => {
		// Add hover style
		checkTarget(e).then( res => {
			if (res) p.classList.add('card__p--hover')
		})
	})

	li.addEventListener('mouseout', e => {
		// Remove hover style
		checkTarget(e).then( res => {
			if (res) p.classList.remove('card__p--hover')
		})
	})

	li.addEventListener('click', e => {
		checkTarget(e).then(res => {
			if (res) {
				// Toggle todo checked
				checkmarkRing.classList.toggle('card__checkmark-ring--hidden')
				checkmarkCheck.classList.toggle('card__checkmark-check--hidden')
				p.classList.toggle('card__p--checked')
				const index = Array.prototype.indexOf.call(todoList.childNodes, li) - 1
				todoItems[index].checked = (todoItems[index].checked ? false : true)
			}
		})
	})

	todoItems.unshift({checked: false, value: value})

	// Append new item on top of list
	todoList.insertBefore(li, todoList.children[0])
}

input.addEventListener('keydown', e => {

	if (e.keyCode === 13 && input.value !== "") {
		console.log('adding new todo...')
		addNewTodo(input.value)
		input.value = ""
	}

})
