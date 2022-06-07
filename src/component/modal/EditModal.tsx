import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal"

type Props = {
    show: boolean,
    handleClose: () => void,
    editTask: string,
    editTitle: string,
    editId: string,
    getData: () => void
}

const EditModal = ({ handleClose, show, editTask, editTitle, editId, getData }: Props) => {

    const [newTitle, setNewTitle] = useState<string>("")
    const [newTask, setNewTask] = useState<string>("")

    const updatetodos = async () => {
        handleClose()
        //update
        const data = { title:newTitle , task:newTask  }
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
            })
        })
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>New title</Form.Label>
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
                            <Form.Label>New Task</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={editTask} onChange={(e) => setNewTask(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => updatetodos()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditModal;