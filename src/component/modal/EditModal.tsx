import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal"
import "./modal.css"

type Props = {
    show: boolean,
    handleClose: () => void,
    editTask: string,
    editTitle: string,
    editId: string,
    getData: () => void
}

const EditModal = ({ handleClose, show, editTask, editTitle, editId, getData }: Props) => {

    const [newTitle, setNewTitle] = useState<string>(editTitle)
    const [newTask, setNewTask] = useState<string>(editTask)
    console.log(newTitle, newTask);
    useEffect(() => {
        setNewTitle(editTitle)
        setNewTask(editTask)
    }, [])
    const updatetodos = async () => {

        //update
        const data = { title: newTitle, task: newTask }
        console.log(data);
        await fetch(`http://localhost:4000/todos/${editId}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => {
            res.json().then((result) => {
                console.log(result);
                getData()
                handleClose()
            })
        })
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal_header'>
                    <Modal.Title>Update Todo</Modal.Title>
                    <Button type="button" className="btn-close bg-light" onClick={handleClose}></Button>
                </Modal.Header>
                <Modal.Body>
                    <Form className='modal_form' style={{fontFamily:"cursive"}}>
                        <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Edit title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter New title"
                                autoFocus
                                defaultValue={editTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Edit Task</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={editTask} onChange={(e) => setNewTask(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal_footer'>
                    <Button className='footer_button m-auto' style={{background: "mediumslateblue"}} size='lg' onClick={() => updatetodos()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditModal;