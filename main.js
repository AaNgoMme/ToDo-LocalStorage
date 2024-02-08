(function () {

    let container = document.querySelector('.container')

    if (!localStorage.getItem('todo')) {
        localStorage.setItem('todo', JSON.stringify([]))
    }

    function createContainerForm() {
        let containerForm = document.createElement('div')
        let containerFormTitle = document.createElement('h1')
        let form = document.createElement('form')
        let input = document.createElement('input')
        let btnNewList = document.createElement('button')

        containerForm.classList = 'container__form'
        containerFormTitle.classList = 'container__form-title'
        containerFormTitle.textContent = 'Список дел'
        form.classList = 'form'
        input.classList = 'input'
        input.placeholder = 'Введите название нового дела'
        btnNewList.classList = 'btn_new-list'
        btnNewList.textContent = 'Добавить дело'

        container.append(containerForm)
        containerForm.append(containerFormTitle)
        containerForm.append(form)
        form.append(input)
        form.append(btnNewList)
    }

    function createContainerList() {
        let containerList = document.createElement('div')
        let list = document.createElement('ul')

        containerList.classList = 'container__list'
        list.classList = 'list'

        container.append(containerList)
        containerList.append(list)

    }



    function createItem(name, isDone) {
        let item = document.createElement('li')
        let itemTitle = document.createElement('h3')
        let itemButtons = document.createElement('div')
        let btnDone = document.createElement('button')
        let btnDelete = document.createElement('button')
        let list = document.querySelector('.list')

        item.classList = 'item'
        itemTitle.classList = 'item-title'
        itemTitle.textContent = name
        itemButtons.classList = 'item-buttons'
        btnDone.classList = 'btn btn_done'
        btnDone.textContent = 'Готво'
        btnDelete.classList = 'btn btn_delete'
        btnDelete.textContent = 'Удалить'

        if (isDone) {
            item.classList.add('item_bg')
        }

        list.append(item)
        item.append(itemTitle)
        item.append(itemButtons)
        itemButtons.append(btnDone)
        itemButtons.append(btnDelete)
    }

    createContainerForm()
    createContainerList()



    let button1 = document.querySelector('.btn_new-list')
    let input1 = document.querySelector('.input')

    button1.addEventListener('click', function (e) {
        e.preventDefault()
        if (!input1.value) {
            return
        }
        let todo = JSON.parse(localStorage.getItem('todo'))
        todo.push([input1.value, false])
        localStorage.setItem('todo', JSON.stringify(todo))
        createItem(input1.value)
        input1.value = ''
        update()
    })


    function update() {
        document.querySelectorAll('.item').forEach((e) => {
            e.remove()
        })
        let todo = JSON.parse(localStorage.getItem('todo'))
        if (todo.length >= 1) {
            for (let key of todo) {
                createItem(key[0], key[1])
                console.log([key])
            }
            done()
            del()
        }
    }

    update()

    function done() {
        document.querySelectorAll('.btn_done').forEach(function (el, key) {
            el.addEventListener('click', function () {
                document.querySelectorAll('.item')[key].classList.toggle('item_bg')
                let todo = JSON.parse(localStorage.getItem('todo'))
                if (!todo[key][1]) {
                    todo[key][1] = true
                    localStorage.setItem('todo', JSON.stringify(todo))
                } else {
                    todo[key][1] = false
                    localStorage.setItem('todo', JSON.stringify(todo))
                }
            })
        })
    }

    function del() {
        document.querySelectorAll('.btn_delete').forEach((el, key) => {
            el.addEventListener('click', () => {
                if (confirm('Вы уверены?')) {
                    let todo = JSON.parse(localStorage.getItem('todo'))
                    todo.splice(key, 1)
                    localStorage.setItem('todo', JSON.stringify(todo))
                    document.querySelectorAll('.item')[key].remove()
                    update()
                }
            })
        })
    }

})()

