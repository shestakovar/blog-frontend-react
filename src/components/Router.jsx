import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router';
import { AuthContext } from '../context';
import LoginPage from '../pages/LoginPage';
import PostDetailPage from '../pages/PostDetailPage';
import PostsPage from '../pages/PostsPage';

const Router = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div>Загрузка</div>
    )
  }

  const everyoneRoutes = [
    { path: "/", component: PostsPage, exact: true },
    { path: "/:id", component: PostDetailPage, exact: true },
  ];

  const AuthRoutes = [
    ...everyoneRoutes,
  ]

  const notAuthRoutes = [
    { path: "/login", component: LoginPage, exact: false },
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
