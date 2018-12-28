'use stict'

const todoItems = []

const todoList = document.getElementById('list')
const input = document.getElementById('new-list-item')
let   isEditingTodo = false

const addNewTodo = (value) => {
	const cardActions       = document.createElement('span')
	const cardActionsArrow  = document.createElement('img')
	const cardActionsAction = document.createElement('span')
	const cardActionEdit    = document.createElement('img')
	const cardActionSave    = document.createElement('img')
	const cardActionDelete  = document.createElement('img')

	const checkmark         = document.createElement('span')
	const checkmarkRing     = document.createElement('img')
	const checkmarkCheck    = document.createElement('img')

	const p                 = document.createElement('p')
	const pSpan             = document.createElement('span')
	const li                = document.createElement('li')

	checkmarkRing.setAttribute('src', './src/svg/circle_ic.svg')
	checkmarkRing.classList.add('card__checkmark-ring', 'checkable')

	checkmarkCheck.setAttribute('src', './src/svg/checkmark_ic.svg')
	checkmarkCheck.classList.add('card__checkmark-check' ,'card__checkmark-check--hidden', 'checkable')

	checkmark.appendChild(checkmarkRing)
	checkmark.appendChild(checkmarkCheck)
	checkmark.classList.add('card__checkmark', 'clickable')

	li.appendChild(checkmark)

	pSpan.innerText = value
	pSpan.classList.add('card__p', 'clickable', 'checkable')
	p.appendChild(pSpan)
	li.appendChild(p)

	cardActionsArrow.setAttribute('src', './src/svg/item_actions_ic.svg')
	cardActionsArrow.classList.add('card__actions-arrow', 'card__actions-arrow--hidden')

	cardActionsArrow.addEventListener('mouseover', _ => {
		cardActionsArrow.classList.add('card__actions-arrow--hover')
		cardActionsAction.classList.remove('card__action--hidden')
	})

	cardActionEdit.setAttribute('src', './src/img/edit_ic_135x135.png')
	cardActionEdit.classList.add('card__actions-edit', 'clickable')
	cardActionSave.setAttribute('src', './src/img/save_ic_135x135.png')
	cardActionSave.classList.add('card__actions-save','card__actions-save--hidden', 'clickable')
	cardActionDelete.setAttribute('src', './src/img/delete_ic_135x135.png')
	cardActionDelete.classList.add('card__actions-delete', 'card__actions-delete--hidden', 'clickable')

	cardActionsAction.classList.add('card__action', 'card__action--hidden')
	cardActionsAction.appendChild(cardActionEdit)
	cardActionsAction.appendChild(cardActionSave)
	cardActionsAction.appendChild(cardActionDelete)

	cardActionsAction.addEventListener('click', e => {
		const parent = e.target.closest('li')
		const todoValue = parent.children[1]
		const index = Array.prototype.indexOf.call(todoList.childNodes, parent) - 1

		if (todoItems[index].checked) {
			todoList.removeChild(li)
			todoItems.splice(index, 1)
			return
		}

		if (todoItems[index].editable) {
			cardActionSave.classList.toggle('card__actions-save--hidden')
			cardActionEdit.classList.toggle('card__actions-edit--hidden')
			todoItems[index].editable = false
			todoValue.contentEditable = false
			isEditingTodo = false
		} else {
			cardActionEdit.classList.toggle('card__actions-edit--hidden')
			cardActionSave.classList.toggle('card__actions-save--hidden')
			todoItems[index].editable = true
			todoValue.contentEditable = true
			todoValue.focus()
			isEditingTodo = true
		}

	})

	cardActions.classList.add('card__actions')
	cardActions.appendChild(cardActionsArrow)
	cardActions.appendChild(cardActionsAction)

	cardActions.addEventListener('mouseleave', _ => {
		const index = Array.prototype.indexOf.call(todoList.childNodes, li) - 1
		if (todoItems[index].editable) return
		cardActionsAction.classList.add('card__action--hidden')
		cardActionsArrow.classList.remove('card__actions-arrow--hover')
	})

	li.appendChild(cardActions)

	li.classList.add('card')

	const checkTarget = event => {
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
		if (isEditingTodo) return
		const index = Array.prototype.indexOf.call(todoList.childNodes, li) - 1
		if (todoItems[index].editable) return
		// Show actions arrow
		cardActionsArrow.classList.remove('card__actions-arrow--hidden')

		// Add hover style
		checkTarget(e).then( res => {
			if (res) pSpan.classList.add('card__p--hover')
		})
	})

	li.addEventListener('mouseout', e => {
		// Remove actions arrow
		cardActionsArrow.classList.add('card__actions-arrow--hidden')

		// Remove hover style
		checkTarget(e).then( res => {
			if (res) pSpan.classList.remove('card__p--hover')
		})
	})

	li.addEventListener('click', e => {
		if ( isEditingTodo) return
		const index = Array.prototype.indexOf.call(todoList.childNodes, li) - 1
		if (todoItems[index].editable) return
		checkTarget(e).then(success => {
			if (success) {
				// Toggle todo checked
				checkmarkRing.classList.toggle('card__checkmark-ring--hidden')
				checkmarkCheck.classList.toggle('card__checkmark-check--hidden')
				pSpan.classList.toggle('card__p--checked')
				const index = Array.prototype.indexOf.call(todoList.childNodes, li) - 1
				if (!todoItems[index].checked) {
					todoItems[index].checked = true
					cardActionDelete.classList.remove('card__actions-delete--hidden')
				} else {
					todoItems[index].checked = false
					cardActionDelete.classList.add('card__actions-delete--hidden')
				}
			}
		})
	})

	todoItems.unshift({checked: false, editable: false, value: value})

	// Append new item on top of list
	todoList.insertBefore(li, todoList.children[0])
}

input.addEventListener('input', e => {
	console.log(e)
	console.log(e.inputType)

	if (e.data === null && e.inputType !== "deleteContentBackward" && input.value !== "") {
		if (input.value.trim(' ') !== "") {
			console.log('adding new todo...')
			addNewTodo(input.value)
		}
		input.value = ""
	}

	input.style.height = '28.8px'
	input.style.height = `${input.scrollHeight}px`
})
