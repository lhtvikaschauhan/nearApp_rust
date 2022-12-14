import React, { useRef } from "react";
import PropTypes from "prop-types";
import { test } from "../assets/js/near/utils";
import { utils } from 'near-api-js';
// React Bootstrap
import { Card, Button, Form } from "react-bootstrap";
function Task(props) {
  const memoField = useRef("");
  const nearField = useRef("");
  const recipientField = useRef("");
  const taskNumberField = useRef("");
  // Submit Button
  const submit = async () => {
    // Checking text was written in field, and not just whitespaces
    let isThereText = memoField.current.value.match("[A-Za-z0-9]");
    if (!isThereText) {
      alert("You are missing the points of the Task....!");
    } else {
      // Save Task to blockchain
 console.log("taskNumber {}", taskNumberField.current.value)
 console.log("assigne {}", recipientField.current.value)
 console.log("Task_heading {}", nearField.current.value)
 console.log("Description {}", memoField.current.value)
      await window.contract.addTasks({
        taskNumber:taskNumberField.current.value,
        assigne: recipientField.current.value,
        Task_heading: nearField.current.value,
        Description: memoField.current.value,
      });
      let a = taskNumberField.current.value + "f"
      await window.contract.Task_Allocated({
        account_id: recipientField.current.value,
        Taskheading: nearField.current.value,
        Description: memoField.current.value,
        taskNumber:parseInt(
          utils.format.parseNearAmount(a)
        ),
      });
    alert("Task allocated")
    }
  };
  return (
    <Card className="bg-light mt-5">
      <Card.Body>
        <Card.Title>Create Task</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Assignee :</Form.Label>
            <Form.Control
              ref={recipientField}
              placeholder="user.testnet"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Task Number:</Form.Label>
            <Form.Control
              ref={taskNumberField}
              placeholder="user.testnet"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Task Heading :</Form.Label>
            <Form.Control
              ref={nearField}
              placeholder="Enter Task Heading"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description :</Form.Label>
            <Form.Control
              ref={memoField}
              placeholder="Task Description, Reference Links."
              as="textarea"
              rows={3}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button
          className="btn btn-outline-success my-2 my-sm-0"
          variant="light"
          onClick={submit}
        >
          Assign Task
        </Button>
      </Card.Body>
    </Card>
  );
}
Task.propTypes = {};
export default Task;