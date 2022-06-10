import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Todo } from '../models/todoModel'
import EditModal from './modal/EditModal'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"

type Props = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  getData: () => void
}

const TodosList: React.FC<Props> = ({ todos, setTodos, getData }) => {
  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState<string>("")
  const [editTask, setEditTask] = useState<string>("")
  const [editid, setEditId] = useState<string>("")


  //Search
  //search
  const [name, setName] = useState('');
  const [foundUsers, setFoundUsers] = useState<Todo[]>(todos);

  const filter = (e: React.ChangeEvent<any>) => {
    const keyword = e.target.value;

    if (keyword) {
      const results = todos.filter((user) => {
        return user.title.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers([]);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };


  const handleDelete = (id: string) => {
    fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        toast.error('Todo Deleted 😐', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });

        getData()
      })
    })
  }

  const handleClose = () => setShow(false);

  const handleShow = (id: string, title: string, task: string) => {
    setShow(true);
    setEditTitle(title)
    setEditTask(task)
    setEditId(id)
  }
  console.log(todos, "todos")
  return (
    <>
      <Container className='w-75'>

        {/* Search */}
        <Form.Group className='mb-4' controlId='formBasicTitle' style={{ textAlign: "center" }}>
          <Form.Label className='h4 text-light'>Search Your Todos</Form.Label>
          <Form.Control className='border border-info w-50 m-auto' type='search' value={name}
            placeholder='Enter title for the todos' onChange={(e) => filter(e)} style={{ borderRadius: "10px" }} />
        </Form.Group>
        <Row xs={1} md={2} className="g-4">
          {foundUsers && foundUsers.length > 0 ? (
            foundUsers.map((user, k) => (
              <div className='mb-3' key={k}>
                <Col>
                  <Card className='card_body' style={{ borderRadius: "10px" }}>
                    <Card.Body>
                      <Card.Title className='titlecard'>{user.title}</Card.Title>
                      <Card.Text>{user.task}</Card.Text>
                      <Button className='m-1' variant='danger' onClick={() => handleDelete(user.id)}><DeleteRoundedIcon /></Button>
                      <Button className='m-1' variant='primary' onClick={() => handleShow(user.id, user.title, user.task)}><EditTwoToneIcon /></Button>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            ))
          ) : (
            ""
          )}
        </Row>
        <h2 className='mt-4' style={{ color: "azure" }}>All Todos</h2>
        {/* TodoList */}
        <Row xs={1} md={2} className="g-4 mt-2">
          {todos.length > 0 ?
            todos.map((todo, k) => (
              <div className='mb-3' key={k}>
                <Col>
                  <Card className='card_body' style={{ borderRadius: "10px" }}>
                    <Card.Body>
                      <Card.Title className='titlecard'><p>{todo.title}</p>
                        <p style={{ fontSize: "15px" }}>Created at: <span style={{ color: "blue", fontSize: "15px" }}>{todo.time}</span></p></Card.Title>
                      <Card.Text>{todo.task}</Card.Text>
                      <Button className='m-1' variant='danger' size='sm' onClick={() => handleDelete(todo.id)}><DeleteRoundedIcon /></Button>
                      <Button className='m-1' variant='primary' size='sm' onClick={() => handleShow(todo.id, todo.title, todo.task)}><EditTwoToneIcon /></Button>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            )) : <div>
              <Card style={{ background: "#b7e6ff" }}>
                <Card.Body>
                  <Card.Title>Welcome to My To-do App</Card.Title>
                  <Card.Text>Create your First Todo</Card.Text>
                </Card.Body>
              </Card>
            </div>
          }
        </Row>
      </Container>
      <div><EditModal handleClose={handleClose} show={show} editTitle={editTitle} editTask={editTask} editId={editid} getData={getData} /></div>
      <ToastContainer />
    </>
  )
}

export default TodosList;