import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Comments() {
  const [comments, setComments] = useState([])
  const [blog, setBlog] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/blog/<slug>/comments`)
        setComments(res.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchComments();
  }, [])

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/blog/`)
        setBlog(res.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchBlog();
  }, [])

  const capitalizer = (word) => {
    if (word)
      return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  }

  

  const getComments = () => {
    let list = [];
    let result = [];

    comments.map(commentPost => {
      return list.push(
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">{capitalizer(commentPost.title)}</strong>
              <h3 className="mb-0">{commentPost.user}</h3>
              <div className="mb-1 text-muted">{commentPost.day} {commentPost.month}</div>
              <p>{commentPost.content}</p>
              {/* this link needs to get fixed, slug is coming up as undefined */}
              <Link to={`/blog/${blog.slug}/comments/${commentPost.id}`} className="stretched-link text-decoration-none">Comment Details</Link>
            </div>
        </div>
      )
    })
    
    // Should make 2 blocks of blog posts next to one another but its not working
    for (let i = 0; i < list.length; i += 2) {
      result.push(
        <div key={i} className='row mb-2'>
          <div className='col-me-6'>
            {list[i]}
          </div>
          <div className='col-me-6'>
            {list[i+1] ? list[i+1] : null}
          </div>
        </div>
      )
    }

    return result;
  }

  return (
    <div className="container mt-3">
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link className="p-2 link-secondary text-decoration-none" to="/category/music">Music</Link>
          <Link className="p-2 link-secondary text-decoration-none" to="/category/technology">Technology</Link>
          <Link className="p-2 link-secondary text-decoration-none" to="/category/reviews">Reviews</Link>
        </nav>
      </div>
      {getComments()}
    </div>
      

  )
}

export default Comments