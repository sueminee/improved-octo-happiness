import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={PostList} />
      <Route exact path="/detail/:id" component={PostDetail} />
    </div>
  );
}

export default App;
