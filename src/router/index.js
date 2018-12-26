import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import Store from '../redux';
import DevTools from '../redux/DevTools';
import Home from '../containers/home';
import Login from '../containers/login';
import Main from '../containers/main';
import NotFound from '../containers/notfound';
import Course from '../containers/course';
import My from '../containers/my';
import AarticleDetails from '../containers/article-details';
import CourseDetails from '../containers/course-details';
import CourseResult from '../containers/course-result';
import Learned from '../containers/learned';
import Subject from '../containers/subject';
import SubjectDetails from '../containers/subject-details';
import Sign from '../containers/sign';
import Share from '../containers/share';
import Register from '../containers/register';
import ResetPass from '../containers/reset-pass';
import Seting from '../containers/seting';
import Message from '../containers/message';
import Review from '../containers/review';
import Chat from '../containers/chat';
import LoginChat from '../containers/login-chat';

const Router = ({component: Component, children, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} ><Switch>{children}</Switch></Component>
    )}
  />
);

const Root = () => (
  <BrowserRouter>
    <Provider store={Store}>
      <div className="router-content">
        {__DEVELOPMENT__ && <DevTools />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset-pass" component={ResetPass} />
          <Route exact path="/seting" component={Seting} />
          <Router exact component={Main} >
            <Router exact path="/" component={Home} />
            <Router exact path="/course" component={Course} />
            <Router exact path="/my" component={My} />
            <Router exact path="/article-details/:id" component={AarticleDetails} />
            <Router exact path="/course/:id" component={CourseDetails} />
            <Router exact path="/course-result/:id" component={CourseResult} />
            <Router exact path="/learned" component={Learned} />
            <Router exact path="/subject" component={Subject} />
            <Router exact path="/subject/:id" component={SubjectDetails} />
            <Router exact path="/sign" component={Sign} />
            <Router exact path="/share" component={Share} />
            <Router exact path="/message" component={Message} />
            <Router exact path="/login-chat" component={LoginChat} />
            <Router exact path="/chat" component={Chat} />
            <Route path="*" component={NotFound} />
          </Router>
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default hot(module)(Root);
