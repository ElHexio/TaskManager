import React from 'react';
import { fetch } from '../utils/Fetch';
import UserSelect from './UserSelect';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class AppPopup extends React.Component {
  state = {
    task: {
      name: '',
      description: '',
      assignee: {
        id: null,
        first_name: null,
        last_name:  null,
        email: null
      }
    }
  }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value } });
  }

  handleDecriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value } });
  }

  handleCardAdd = () => {
    fetch('POST', Routes.api_v1_tasks_path(), {
      task: {
        name: this.state.task.name,
        description: this.state.task.description,
        assignee_id: this.state.task.assignee.id
      }
    }).then(() => {
        this.props.onClose(true);
    });
  }

  handleAssigneeChange = (value) => {
    this.setState({ task: { ...this.state.task, assignee: value }});
  }

  render () {
    return <div>
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            New task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup controlId="formTaskName">
              <ControlLabel type="text">Task name:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.task.name}
                placeholder='Set the name for the task'
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup controlId="formDescriptionName">
              <ControlLabel>Task description:</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={this.state.task.description}
                placeholder='Set the description for the task'
                onChange={this.handleDecriptionChange}
              />
            </FormGroup>
            <FormGroup controlId="formAssignee">
              <ControlLabel type="text">Assignee:</ControlLabel>
              <UserSelect
                id="Assignee"
                onChange={this.handleAssigneeChange}
                value={this.state.task.assignee}
              />
            </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleCardAdd}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
}
