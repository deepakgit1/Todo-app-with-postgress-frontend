import React, { FC, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Props = {}

const SignUp: FC = (props: Props) => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    // console.log(userData);

    //Signup
    const handleSubmit = async () => {
        if (!name || !email || !password) {
            toast('Please Fill All Details!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });
        } else {
            const data = { name, email, password }
            await fetch("http://localhost:4000/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => {
                res.json().then((data) => {
                    if (data.statusCode === 400) {
                        toast('User Already Registered!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            progress: undefined,
                        });

                    } else {
                        console.log(data);
                        navigate("/login")
                    }
                })
            })
        }
    }


    return (
        <div>
            <Container className='w-50'
                style={{
                    background: "linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b)",
                    padding: "50px",
                    marginTop: "5%",
                    borderRadius: "10px",
                    fontFamily: "cursive",
                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                }}>
                <h1>Please Login</h1>
                <Form.Label className='mt-2 h5 text-light' size="lg">Name</Form.Label>
                <Form.Control type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
                <Form.Label className='mt-2 h5 text-light' size="lg" >Email</Form.Label>
                <Form.Control type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                <Form.Label className='mt-2 h5 text-light' size="lg">Password</Form.Label>
                <Form.Control type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                <div className='d-grid gap-2 mt-3'>
                    <Button className='button' style={{ borderRadius: "10px" }} size='lg' onClick={() => handleSubmit()}>Signup</Button>
                </div>
                <div style={{ color: "#fff", marginTop: "4px" }}>Already Registerd?Click to <Link style={{ textDecoration: "none" }} to={"/login"}>Login</Link></div>
            </Container>
            <ToastContainer />
        </div>
    )
}

export default SignUp;