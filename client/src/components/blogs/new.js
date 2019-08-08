import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from "axios";

function New(){
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post('/api/blogs', {
      // Spread opperator brings in all the values in inputs and sets them to the key blog
      blog: inputs
    })
    .then(res => setRedirect(true))
    .catch(err => console.error(err));
  }

  function handleInputChange(event) {
    event.persist();

    const {name, value} = event.target;

    setInputs( inputs => {
      inputs[name] = value;
      return inputs;
    } );
  }

  if( redirect ) return <Redirect to="/blogs" />

  return (
    <div className="container">
      <header>
        <h1>New Blog Post</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" name="title" required="required" onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea type="text" className="form-control" name="content" required="required" onChange={handleInputChange}></textarea>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select className="form-control" name="status" required="required" onChange={handleInputChange}>
              <option value="DRAFT">draft</option>
              <option value="PUBLISHED">publish</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;