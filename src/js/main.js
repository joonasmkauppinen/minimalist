'use stict'

const todoList = document.getElementById('list')
const input = document.getElementById('new-list-item')

const addNewTodo = (value) => {
	const li  = document.createElement('li')
	const img = document.createElement('img')
	const p   = document.createElement('p')

	img.setAttribute('src', './src/svg/circle_ic.svg')
	img.classList.add('clickable')
	li.appendChild(img)

	p.innerText = value
	p.classList.add('clickable')
	p.classList.add('list-p')
	p.addEventListener('click', e => {
		e.target.classList.toggle('list-p-checked')
		console.log('Clicked on item: ', e.target.innerText)
	})
	li.appendChild(p)

	li.classList.add('card')

	todoList.insertBefore(li, todoList.children[0])
}

input.addEventListener('keydown', e => {

	if (e.keyCode === 13 && input.value !== "") {
		console.log('adding new todo...')
		addNewTodo(input.value)
		input.value = ""
	}

})
