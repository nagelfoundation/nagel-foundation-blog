import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Category(props) {
  const [blogs, setBlogs] = useState([])
  const [currentCategory, setCurrentCategory] = useState('')

  useEffect(() => {
    const category = props.match.params.id
    setCurrentCategory(capitalizer(category))

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const fetchData = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/blog/category`, { category }, config)
        setBlogs(res.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [props.match.params.id])

  const getCategoryBlogs = () => {
    let list = []
    let result = []

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

  const capitalizer = (word) => {
    if (word)
      return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  }

  return (
    <div className='container mt-3'>
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link className="p-2 link-secondary text-decoration-none" to="/category/music">Music</Link>
          <Link className="p-2 link-secondary text-decoration-none" to="/category/technology">Technology</Link>
          <Link className="p-2 link-secondary text-decoration-none" to="/category/reviews">Reviews</Link>
        </nav>
      </div>
      <h3 className='display-4'>{currentCategory}</h3>
      {getCategoryBlogs()}
    </div>
  )
}

export default Category
