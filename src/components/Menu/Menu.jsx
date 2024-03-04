import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { useContext } from 'react';
import globalContext from '../../Context';

function Menu({id, trashStatus}) {
    const context = useContext(globalContext)
    const {todoList, setTodoList, menuPosition} = context

    const moveToTrash = (id) => {
        let newTodos = context.todoList.map((todo) => {
        if(todo.id === id) {
            let menuStatus = !todo.menuOpen
            return {...todo, menuOpen: menuStatus, isInTrash: !trashStatus} 
        }else return todo
    })

        setTodoList(newTodos)
    }

    const moveBackToTodo = (id) => {
        let newTodos = todoList.map((todo) => {
        if(todo.id === id) {
            let menuStatus = !todo.menuOpen
            return {...todo, menuOpen: menuStatus, isInTrash: !trashStatus, status: "To Do", isDone: false} 
        }else return todo
    })

        setTodoList(newTodos)
    }

    const deleteTodoItem = (id) => {
        let newTodos = todoList.filter((todo) => todo.id !== id)
        setTodoList(newTodos)
    }

    if(!trashStatus) {
        return (
            <div style={{position: 'fixed', top: menuPosition.top, left: menuPosition.left}}>
                <button onClick={() => moveToTrash(id)} className='menu_1_btn'>
                    <FontAwesomeIcon icon={faTrash} size="lg" style={{color: "#353535",}} />
                    <span className='menu_1_text'>Move to Trash</span>
                </button>
                
            </div>
        )
    } else if (trashStatus) {
        return (
            <div className='menu_2' style={{position: 'fixed', top: menuPosition.top, left: menuPosition.left}}>               
                <button onClick={() => deleteTodoItem(id)} className='menu_2_btn'>
                    <FontAwesomeIcon icon={faTrash} size="lg" className='menu_icon' />
                    Delete Forever
                </button>              
                <button onClick={() => moveBackToTodo(id)} className='menu_2_btn'>
                    <FontAwesomeIcon icon={faSquareCheck} size="lg" className='menu_icon'/>
                    Move Back to To Do
                </button>
            </div>
        )
    }
    
}

export default Menu;