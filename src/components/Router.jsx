import React from 'react'
import { Switch, Route } from 'react-router';
import PostDetailPage from '../pages/PostDetailPage';
import PostsPage from '../pages/PostsPage';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <PostsPage />
      </Route>
      <Route exact path="/:id">
        <PostDetailPage />
      </Route>
    </Switch>
  )
}

export default Router;
