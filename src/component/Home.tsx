import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../models/todoModel'
import CreateTodos from './CreateTodos'
import Header from './Header'
import TodosList from './TodosList'

type Props = {}

const Home = (props: Props) => {
    const [todos, setTodos] = useState<Todo[] | any>([])
    const navigate = useNavigate()

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
    
    //Login Validation
    const validUser = localStorage.getItem("token")
    useEffect(() => {
        getData()
        if (validUser) {
            navigate("/")
        }else{
            navigate("/login")
        }
    }, [validUser])


    return (
        <div>
            <Header />
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <CreateTodos todos={todos} setTodos={setTodos} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TodosList todos={todos} setTodos={setTodos} getData={getData}  />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home