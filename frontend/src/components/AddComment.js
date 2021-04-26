import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';


const addComment = (commentObject) => {
  return fetch(`${process.env.REACT_APP_API_URL}api/comment/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(commentObject)
  });
};

function AddComment() {
  const [ redirect, setRedirect ] = React.useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const commentObject = {
      title: event.target.elements[0].value,
      user: event.target.elements[1].value,
      month: event.target.elements[2].value,
      day: event.target.elements[3].value,
      content: event.target.elements[4].value,
      blog_post: event.target.elements[5].value
    }

    try {
      const response = await addComment(commentObject);
      if (response.status === 201) {
        setRedirect(true);
      }
    } catch (err) {
      console.error('error occurred posting article: ', err);
    }
  };

  return redirect ? <Redirect to='/' /> : (
    <div style={{ padding: '20px' }}>
      <h3> Add a Comment </h3>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" />
        </FormGroup>
        <FormGroup>
          <Label for="user">User</Label>
          <Input type="text" name="user" id="user" />
        </FormGroup>
        <FormGroup>
          <Label for="month">Month</Label>
          <Input type="text" name="month" id="month" />
        </FormGroup>
        <FormGroup>
          <Label for="day">Day</Label>
          <Input type="text" name="day" id="day" />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <Input type="textarea" name="content" id="content" />
        </FormGroup>
        <FormGroup>
          <Label for="blog_post">Blog Post</Label>
          <Input type="select" name="blog_post" id="blog_post">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <Button className="mt-3">Submit</Button>
      </Form>
    </div>
  )
};

export default AddComment;