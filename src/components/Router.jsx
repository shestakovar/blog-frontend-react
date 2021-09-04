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

  const AuthRoutes = [...everyoneRoutes,

  ]

  const notAuthRoutes = [...everyoneRoutes,
  { path: "/login", component: LoginPage, exact: false },
  ];
  return (
    <Switch>
      {!isAuth
        ?
        <React.Fragment>{notAuthRoutes.map(route =>
          <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />)}
          <Redirect to="/login" />
        </React.Fragment>

        : <React.Fragment>{AuthRoutes.map(route =>
          <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />)}
          <Redirect to="/" />
        </React.Fragment>
      }
    </Switch>
  )
}

export default Router;
