// import { createTodo } from "../helpers/todos";

// import { deleteTodo } from "../helpers/todos";

$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    })
    $('#todoInput').keypress(function(event){
        if(event.which==13){
            createTodo();
        }
    });
    $('.list').on("click",'span',function(e){
        e.stopPropagation();
        deleteTodo($(this).parent());
        // console.log($(this).parent().data('id'));
    });
    $(".list").on("click",".task",function(){
        updateTodo($(this));
    });
});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo=$('<li class="task">'+todo.name+'<span>X</span></li>');
    newTodo.data('id',todo._id);
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}



function createTodo(){
    var usrIp=$('#todoInput').val();
    $.post("/api/todos/",{name: usrIp})    
    .then(function(newTodo){       
        addTodo(newTodo);
        // console.log(newTodo);   
    })    
    .catch(function(err){
        console.log(err);
    });
}

function deleteTodo(todo){
    var clickedId=todo.data('id');

    $.ajax({
        method:"DELETE",
        url: "api/todos/"+clickedId
    })
    .then(function(data){
        console.log(data);
        todo.remove();
    })
}
function updateTodo(el){
    let todoId    = updateURL = "api/todos/todoId="+el.data("id"),
        isCompleted = !el.data("completed");
        reqData = {completed:isCompleted};
    $.ajax({
        method: "PUT",
        url: updateURL,
        data: reqData,
    })
    .then(function(data){
        el.toggleClass("done");
        el.data("completed",isCompleted);
        
    })
    .catch(function(err){
        console.log(err);
    })
}