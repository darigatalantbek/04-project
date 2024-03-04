import React, { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import Buttons from "./components/Buttons/Buttons";
import Modal from "./components/Modal/Modal";
import Menu from "./components/Menu/Menu";
import globalContext from './Context'
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("To Do");
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')));
  const [menuPosition, setMenuPosition] = useState({})

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  const openModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function changeFilter(status) {
    setFilter(status);
  };

  const addNewTodo = (todoText) => {
    if(todoText == "") return;
    const newTodo = {
      id: Date.now(),
      text: todoText,
      status: "To Do",
      isInTrash: false,
      isDone: false,
      menuOpen : false,
    };

    setTodoList([...todoList, newTodo]);
    setFilter("To Do")
  };  

  const doneAction = (todo, id) => { 
    todo.isDone = !todo.isDone
    let newTodos ={};
      if(todo.isDone) {
        newTodos = todoList.map((item) => item.id === id ? {...item, status: 'Done'} : item)
      } else if(!todo.isDone) {
        newTodos = todoList.map((item) => item.id === id ? {...item, status: 'To Do'} : item)
      }
      
      setTodoList(newTodos)
  };

  const filteredTodoList = todoList.filter((todo) => {
    if(filter == "To Do" && todo.status == "To Do" && todo.isInTrash == false) return todo;
    if(filter == "Done" && todo.status == "Done" && todo.isInTrash == false) return todo;
    if(filter == "Trash" && todo.isInTrash == true) return todo;
  });

  const changeMenuStatus = (id) => {
    let newTodos ={};
    newTodos = todoList.map((todo) => {
      if(todo.id === id) {
        let menuStatus = !todo.menuOpen;
        return {...todo, menuOpen: menuStatus}
      } else return todo
  })
      
    setTodoList(newTodos)
  }

  const changeMenuPosition = (event) => {
    const button = event.target;
    const buttonPosition = button.getBoundingClientRect();
    setMenuPosition({ top: buttonPosition.bottom + 6, left: buttonPosition.left });
  }

  return (
    <globalContext.Provider value={{todoList, setTodoList, menuPosition, setMenuPosition}}>
      <div>
        <div className="top_container">
          <div className="left_block">
            <Header />
            <Buttons changeFilter={changeFilter} />
          </div>
          <div className="right_block">
            {isModalOpen && <Modal closeModal={closeModal} addNewTodo={addNewTodo} />}
            <button className="addBtn" onClick={openModal}>
              +
            </button>
          </div>
        </div>

        <div className="list_container">
          <h3 className="list_title">{filter}</h3>
          <hr className="line" />

          {filteredTodoList &&
            filteredTodoList.map((todo) => (
              <div key={todo.id} className="todo_item">

                <button onClick={(event) => (
                  changeMenuStatus(todo.id), 
                  changeMenuPosition(event)
                )} className="action_btn">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>

                <button onClick={() => doneAction(todo, todo.id)} className="done_btn">
                  {todo.isDone ? 
                  <FontAwesomeIcon icon={faSquareCheck} size="lg" style={{color:"#712fff"}} />
                  : <FontAwesomeIcon icon={faSquare} size="lg" />} 
                </button>
                <p className={todo.status === 'Done' ? "todo_done_text" : "todo_text"}>{todo.text}</p>

                {todo.menuOpen ? <Menu id={todo.id} trashStatus={todo.isInTrash}/> : <></>}
              </div>           
            ))}
             
        </div>
      </div>
    </globalContext.Provider>
  );
}

export default App;
