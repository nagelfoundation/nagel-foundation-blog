import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container">
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <h1 className="display-4">Welcome to my Blog</h1>
        <p className="lead">This is the place where I'll discuss and analyze two of my passions music and technology</p>
        <hr className="my-4"/>
        <p>Click to check out the Blog</p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/blog" role="button">Check it!</Link>
        </p>
        <br/>
        <p>...and while you're at it check out my band <strong>Young Pandas</strong></p>
        <div className="container">
          <div className="row align-items-center justify-content-evenly">
          <iframe title='young-pandas-spotify'
              src="https://open.spotify.com/embed/album/1bux1hnDeYGIf9ecmWefdy" 
              width="655" height="390" frameBorder="0" allowtransparency="true" allow="encrypted-media" 
              className="col px-1 p-1 border bg-light"></iframe>
            <iframe 
              title='young-pandas-intro' id="player" type="text/html" width="655" height="390"
              src="https://www.youtube.com/embed/0BFYPevdb8E?enablejsapi=1"
              frameBorder="0"
              className="col px-1 p-1 border bg-light"></iframe>
          </div>
        </div> 
        <div className="container d-flex align-items-center">
          <iframe title="follow-yp"
            src="https://open.spotify.com/follow/1/?uri=spotify:artist:68NZvxBs0rAjDSJvQ4ynSk&size=detail&theme=dark" 
            width="300" height="75" scrolling="no" frameBorder="0" allowtransparency="true" className="col px-1 p-2 bg-dark"></iframe>
          <Link className="btn btn-primary btn-md" to="/homepage" role="button">Login</Link>
        </div> 
      </div>
    </div>
  )
}


export default Home
