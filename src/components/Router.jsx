import React from 'react'
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import LoginPage from '../pages/LoginPage';
import PostCreatePage from '../pages/PostCreatePage';
import PostDetailPage from '../pages/PostDetailPage';
import PostListPage from '../pages/PostListPage';
import RegisterPage from '../pages/RegisterPage';
import UserPage from '../pages/UserPage';

const Router = () => {
  const isAuth = useSelector(state => state.isAuth);

  const everyoneRoutes = [
    { path: "/", component: PostListPage, exact: true },
    { path: "/:id(\\d+)", component: PostDetailPage, exact: true },
    { path: "/users/:id", component: UserPage, exact: false },
  ];

  const AuthRoutes = [
    { path: "/posts/add", component: PostCreatePage, exact: false },
    { path: "/posts/:id(\\d+)", component: PostListPage, exact: true },
    ...everyoneRoutes,
  ]

  const notAuthRoutes = [
    { path: "/login", component: LoginPage, exact: false },
    { path: "/register", component: RegisterPage, exact: false },
    ...everyoneRoutes,
  ];
  return (
    !isAuth
      ? <Switch>
        {notAuthRoutes.map(route =>
          <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />)}
        <Redirect to="/login" />
      </Switch>
      : <Switch>
        {AuthRoutes.map(route =>
          <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />)}
        <Redirect to="/" />
      </Switch>
  )
}

export default Router;
