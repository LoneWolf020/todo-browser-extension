import { useEffect, useState } from "react"
import {v4 as uuid} from "uuid";
import "./Todo.css"

export const Todo = () => {

    const [todo, setTodo] = useState();
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        const userTodo = JSON.parse(localStorage.getItem("todo"));
        userTodo && setTodoList(userTodo);
    }, [])

    const handleTodoInputChange = (evt) => {
        setTodo(evt.target.value);
    }

    const handleTodoEnter = (evt) => {
        if (evt.key === "Enter"){
            const updatedTodoList = [...todoList, {_id: uuid(), todo, isCompleted:false}];
            setTodoList(updatedTodoList);
            setTodo("");
            localStorage.setItem("todo", JSON.stringify(updatedTodoList));
        }
    }

    const handleTodoCheck = (todoId) => {
        const updatedTodoList = todoList.map(todo => todoId === todo._id ? {...todo, isCompleted: !todo.isCompleted} : todo);
        setTodoList(updatedTodoList);
        localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    }

    const handleTodoDelete = (todoId) => {
        const updatedTodoList = todoList.filter(({_id}) => _id !== todoId);
        setTodoList(updatedTodoList);
        localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    }

    return (
        <div className="todo-container absolute">
            <div className="todo-input-container">
                <input placeholder="Todo Here" className="todo-input" type="text" value={todo} onChange={handleTodoInputChange} onKeyUp={handleTodoEnter}/>
            </div>

            <div className="">
                { 
                    todoList && todoList.map(({todo, _id, isCompleted}) => {
                        return (
                            <div key={_id} className="todo-items d-flex align-center">
                                <label className={`${isCompleted ? "strike-through" : ""} todo-label`}>
                                    <input type="checkbox" className="todo-check" onChange={()=> handleTodoCheck(_id)} checked={isCompleted} />
                                    {todo}
                                </label>
                                <button className='button cursor todo-clear-btn' onClick={()=> handleTodoDelete(_id)}>
                                    <span className="material-symbols-outlined">
                                        Clear
                                    </span>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}