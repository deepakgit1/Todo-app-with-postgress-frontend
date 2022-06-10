import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// import todoIcon from "../../public/1.png"  

type Props = {}

const Header: React.FC = (props: Props) => {
  const navigate = useNavigate()

  //logout
  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const userName = localStorage.getItem("name")

  return (
    <div >
      <Navbar fixed="top" style={{ background: "linear-gradient(to right, #4776e6, #8e54e9)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
        <p style={{ margin: "auto", marginLeft: "8px", color: "#fff" }}>Welcome, {userName} </p>
        <Container>
          <div style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png" style={{ height: "40px", margin: "auto" }} alt="" />
            <h5 style={{ margin: "auto", color: "#fff" }}>MAKE YOUR TO-DO </h5>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png" style={{ height: "40px", margin: "auto" }} alt="" />
          </div>
          <Button variant="outline-light" onClick={() => handleLogout()} >Logout</Button>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header