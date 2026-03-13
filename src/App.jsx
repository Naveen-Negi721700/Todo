import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './assets/component/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  const [ShowFinished, setShowFinished] = useState(true)


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinshed = () => {
  setShowFinished(!ShowFinished)
}
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS();
  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS();
  }


  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLS();
  }

  const handleChange = (e) => {

    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLS();
  }
  return (
    <>
      <Navbar />
      <div className="md:container bg-violet-100  mx-auto my-5 rounded-xl  p-5 min-h-[80vh] md:w-1/2">
      <h1 className=' font-bold  text-center text-xl'>iTask - Manage your todos at one place </h1>
        <div className="addTodo  my-5 flex flex-col gap-4">
          <h2 className=' text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='bg-white  w-full  rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800  hover:bg-violet-900  disabled:bg-violet-700 p-2 text-sm font-bold cursor-pointer py-1 text-white rounded-md mx-6'>Add</button>
        </div>
        <input onChange={toggleFinshed} type="checkbox" checked={ShowFinished} /> Show Finished
        <h2 className=' text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5'>No Todo to Display,</div>}
          {todos.map(items => {

            return (ShowFinished || !items.isCompleted) &&<div key={items.id} className="todo flex w-full my-3 justify-between items-start gap-4">
              <div className='flex gap-5 items-start w-full'>
                <input name={items.id} onChange={handleCheckbox} type="checkbox" checked={items.isCompleted} id='' />
                <div className={`${items.isCompleted ? "line-through" : ""} break-all flex-1`}>
                  {items.todo}
                </div>
              </div>
             <div className="buttons flex gap-2 shrink-0">
                <button onClick={(e) => handleEdit(e, items.id)} className='bg-violet-800  hover:bg-violet-900  p-2 text-sm font-bold cursor-pointer py-1 text-white rounded-md mx-1'>Save</button>
                <button onClick={(e) => { handleDelete(e, items.id) }} className='bg-violet-800  hover:bg-violet-900  p-2 text-sm font-bold cursor-pointer py-1 text-white rounded-md mx-1'>Delete</button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
