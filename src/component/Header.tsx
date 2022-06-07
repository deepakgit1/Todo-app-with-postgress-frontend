import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Header:React.FC = (props: Props) => {
  const navigate = useNavigate()

    //logout
    const handleLogout = () => {
       localStorage.clear()
      navigate("/login")
    }

  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <h5 style={{margin:"auto"}}>MAKE YOUR TO-DO </h5>
          </Navbar.Brand>
          <Button variant="outline-light" onClick={()=>handleLogout()} >Logout</Button>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header