import { Console } from 'console'
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Todo } from '../models/todoModel'
import EditModal from './modal/EditModal'

type Props = {
  todos: Todo[],
  setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,
  getData:()=>void
}

const TodosList:React.FC<Props> = ({todos,setTodos,getData}) => {
  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState<string>("")
  const [editTask , setEditTask]= useState<string>("")
  const [editid, setEditId] = useState<string>("")

  const handleDelete=(id:string)=>{
    fetch(`http://localhost:4000/todos/${id}`,{
      method:"DELETE",
    }).then((res)=>{
      res.json().then((data)=>{
        console.log(data);
        
        getData()
      })
    })
  }

  const handleClose = () => setShow(false);

  const handleShow = (id:string,title:string,task:string) => {
    setShow(true);
    setEditTitle(title)
    setEditTask(task)
    setEditId(id)
  }
console.log(todos,"todos")
  return (
    <>
      <h2 className='mt-3'>Your todos</h2>
      <>
      {todos.length >0 ?
        todos.map((todo, k)=>(
          <div className='mb-3' key={k}>
          <Card>
            <Card.Body>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>{todo.task}</Card.Text>
            <Button className='m-1' variant='danger' onClick={()=>handleDelete(todo.id)}>COMPLETE</Button>
            <Button className='m-1' variant='success' onClick={()=>handleShow(todo.id,todo.title,todo.task)}>Edit todos</Button>
            </Card.Body>
          </Card>
        </div>

        )):<div>
            <Card style={{background:"#b7e6ff"}}>
            <Card.Body>
            <Card.Title>Welcome to My To-do App</Card.Title>
            <Card.Text>Create your First Todo</Card.Text>
            </Card.Body>
          </Card>
        </div>
      }
      </>
      <div><EditModal handleClose={handleClose} show={show} editTitle={editTitle} editTask={editTask} editId={editid} getData={getData}  /></div>
    </>
  )
}

export default TodosList;