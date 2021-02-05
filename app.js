//Selectors
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');
    const filterOption = document.querySelector('.filter-todo');
//EventListener
    document.addEventListener("DOMContentLoaded" , getToDo);
    todoButton.addEventListener('click', addToDo);
    todoList.addEventListener('click', deleteCheck);
    filterOption.addEventListener('click', filterToDo);
//Functions

    function addToDo(event){
         //prevent form from submitting
        event.preventDefault();
      
        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create Li
        const newToDo = document.createElement('li');
        newToDo.innerText = todoInput.value;
        newToDo.classList.add("todo-item");
        todoDiv.appendChild(newToDo);
        
        //Add todo to local storage
        saveToLocal(todoInput.value);

        //Check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>' ;
        completedButton.classList.add("completed-button");
        todoDiv.appendChild(completedButton);

        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>' ;
        trashButton.classList.add("trash-button");
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);

        //clear to input value
        todoInput.value= "" ;
    }

    function deleteCheck(eve){
        const item = eve.target ;

        //Delete todo
        if( item.classList[0]  === 'trash-button'){
            const todo = item.parentElement;
            //animation
            todo.classList.add('fall');
            removeLocalTodo(todo);
            todo.addEventListener('transitionend', function(){
                todo.remove();
            });    
        }

        //Check todo
        if(item.classList[0] === 'completed-button'){
            const todo = item.parentElement;
            todo.classList.toggle('completed');
        }
    }

    function filterToDo(e){
        const todos = todoList.childNodes;
        todos.forEach((todo) => {
            if(todo.classList !== undefined){
                switch(e.target.value){
                    case "all":
                        todo.style.display="flex";
                        break;
                    case "completed":
                        if(todo.classList.contains("completed")){
                            todo.style.display="flex"; 
                        }  
                        else{
                            todo.style.display="none";
                        } 
                        break; 
                    case "uncompleted":
                        if(!todo.classList.contains("completed")){
                            todo.style.display="flex";
                            }
                        else{
                            todo.style.display="none";
                        } 
                        break;
                   }
               }
           });
       }



    // function to save the list in local storage
    function saveToLocal(todo){
        //check if the local storage already contains a list 
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }  


    function getToDo(){
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create Li
        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add("todo-item");
        todoDiv.appendChild(newToDo);

        //Check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>' ;
        completedButton.classList.add("completed-button");
        todoDiv.appendChild(completedButton);

        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>' ;
        trashButton.classList.add("trash-button");
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
        });
    }


    function removeLocalTodo(todo){
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }