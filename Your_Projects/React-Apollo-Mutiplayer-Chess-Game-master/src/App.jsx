import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthRoute from './auth/AuthRoute';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Layout from './layout/Layout';

const HomeRoute = lazy(() => import('./routes/Home'));
const LoginRoute = lazy(() => import('./routes/Login'));
const LogoutRoute = lazy(() => import('./routes/Logout'));
const SignupRoute = lazy(() => import('./routes/Signup'));
const ProfileRoute = lazy(() => import('./routes/Profile'));
const PlayChessRoute = lazy(() => import('./routes/PlayChess'));
const GameHistoryRoute = lazy(() => import('./routes/GameHistory'));
const RankingsRoute = lazy(() => import('./routes/Rankings'));
const GameInfoRoute = lazy(() => import('./routes/GameInfo'));
const NotFoundRoute = lazy(() => import('./routes/404'));

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <AuthRoute exact path="/" component={HomeRoute} />

              <Route path="/login" component={LoginRoute} />
              <Route path="/signup" component={SignupRoute} />
              <Route path="/logout" component={LogoutRoute} />

              <AuthRoute path="/play-chess/:id" component={PlayChessRoute} />
              <AuthRoute path="/game-history" component={GameHistoryRoute} />
              <AuthRoute path="/game/:id" component={GameInfoRoute} />
              <AuthRoute path="/rankings" component={RankingsRoute} />
              <AuthRoute path="/profile" component={ProfileRoute} />

              <Route component={NotFoundRoute} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    );
  }
}

export default App;
