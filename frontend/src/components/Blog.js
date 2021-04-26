import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Blog() {
  const [blogs, setBlogs] = useState([])
  const [featuredBlog, setFeaturedBlog] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/blog/featured`)
        setFeaturedBlog(res.data[0])
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/blog/`)
        setBlogs(res.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchBlogs();
  }, [])

  const capitalizer = (word) => {
    if (word)
      return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  }

  const getBlogs = () => {
    let list = [];
    let result = [];

    blogs.map(blogPost => {
      return list.push(
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">{capitalizer(blogPost.category)}</strong>
              <h3 className="mb-0">{blogPost.title}</h3>
              <div className="mb-1 text-muted">{blogPost.day} {blogPost.month}</div>
              <p className="card-text mb-auto">{blogPost.excerpt}</p>
              <Link to={`/blog/${blogPost.slug}`} className="stretched-link text-decoration-none">Continue reading...</Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail'></img>
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
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 fst-italic">{featuredBlog.title}</h1>
            <p className="lead my-3">{featuredBlog.excerpt}</p>
            <p className="lead mb-0"><Link to={`/blog/${featuredBlog.slug}`} className="text-white fw-bold ">Continue reading...</Link></p>
        </div>
      </div>
      {getBlogs()}
    </div>
      

  )
}

export default Blog
