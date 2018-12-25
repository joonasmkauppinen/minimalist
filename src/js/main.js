'use stict'

const todoItems = []

const todoList = document.getElementById('list')
const input = document.getElementById('new-list-item')

const addNewTodo = (value) => {
	const cardActions       = document.createElement('span')
	const cardActionsArrow  = document.createElement('img')
	const cardActionsAction = document.createElement('img')
	const checkmark         = document.createElement('span')
	const checkmarkRing     = document.createElement('img')
	const checkmarkCheck    = document.createElement('img')
	const p                 = document.createElement('p')
	const li                = document.createElement('li')

	checkmarkRing.setAttribute('src', './src/svg/circle_ic.svg')
	checkmarkRing.classList.add('card__checkmark-ring', 'checkable')

	checkmarkCheck.setAttribute('src', './src/svg/checkmark_ic.svg')
	checkmarkCheck.classList.add('card__checkmark-check' ,'card__checkmark-check--hidden', 'checkable')

	checkmark.appendChild(checkmarkRing)
	checkmark.appendChild(checkmarkCheck)
	checkmark.classList.add('card__checkmark', 'clickable')

	li.appendChild(checkmark)

	p.innerText = value
	p.classList.add('card__p', 'clickable', 'checkable')
	li.appendChild(p)

	cardActionsArrow.setAttribute('src', './src/svg/item_actions_ic.svg')
	cardActionsArrow.classList.add('card__actions-arrow')
	cardActionsAction.setAttribute('src', './src/img/edit_ic.png')
	cardActionsAction.classList.add('clickable')
	cardActions.classList.add('card__actions')
	cardActions.appendChild(cardActionsArrow)
	cardActions.appendChild(cardActionsAction)
	li.appendChild(cardActions)

	li.classList.add('card')

	const checkTarget = (event) => {
		return new Promise(resolve => {
			const isCheckable = event.target.classList.contains('checkable')
			if (isCheckable) {
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
