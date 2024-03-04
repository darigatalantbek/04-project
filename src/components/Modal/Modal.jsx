import { useState } from 'react';
import './styles.css'

function Modal({addNewTodo, closeModal}) {
    const [todoText, setTodoText] = useState('')

    const handleChange = (event) => {
        setTodoText(event.target.value)
    }

    const handleClick =() => {
        addNewTodo(todoText)
        closeModal();
    }

    return (
        <div className='modal'>
            <p className='modal_title'>Add New To Do</p>
            <textarea value={todoText} onChange={handleChange} placeholder='Your text' className='modal_input' type='text'></textarea>
            <button onClick={handleClick} className='modal_btn'>Add</button>
        </div>
    )
}

export default Modal;