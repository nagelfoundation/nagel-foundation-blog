import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';
import CommentDetail from './components/CommentDetail';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';
import UpdateComment from './components/UpdateComment';


function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/blog/:id' component={BlogDetail} />
          <Route exact path='/category/:id' component={Category} />
          <Route exact path='/blog/:id/comments' component={CommentList} />
          <Route exact path='/blog/:id/comments/:id' component={CommentDetail} />
          <Route exact path='/add-comment' component={AddComment} />
          <Route exact path='/comments/:id/update' component={UpdateComment} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
