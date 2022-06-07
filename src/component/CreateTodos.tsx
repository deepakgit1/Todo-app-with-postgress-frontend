import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Todo } from '../models/todoModel'

type Props = {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function CreateTodos({ setTodos }: Props) {
    const [error, setError] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [task, setTask] = useState<string>("")

    const getData = ()=>{
        let token = {token: localStorage.getItem("token")} 
        fetch("http://localhost:4000/todos/get/all",{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-type":"application/json"
            },
            body: JSON.stringify(token)
        }).then((res)=>{
            res.json().then((data)=>{
                console.log(data);
                setTodos(data)
            })
        })
      }



    const addData = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!title || !task) {
            return setError("All fields are mendatory")
        }
        const token = localStorage.getItem("token")
        const data = { title, task, token }
        fetch("http://localhost:4000/todos/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => {
            res.json().then((data) => {
                getData()
                setTitle("")
                setTask("")
            })
        })
    }

    return (
        <div>
            {
                error ? <Alert variant='danger'>{error}</Alert> : ""
            }
            <Form action="" className='mt-3 mb-3' onSubmit={(e) => addData(e)}>
                <Form.Group className='mb-3' controlId='formBasicTitle'>
                    <Form.Label className='h3'>Title</Form.Label>
                    <Form.Control className='border border-info' type='text' placeholder='Enter title for the todos' value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicText'>
                    <Form.Label className='h3'>Text</Form.Label>
                    <Form.Control className='border border-info' type='text' placeholder='Enter your todos' as={"textarea"} value={task} onChange={(e) => setTask(e.target.value)} />
                </Form.Group>
                <Button type='submit' variant="primary">Submit</Button>
            </Form>
        </div>
    )
}

export default CreateTodos;