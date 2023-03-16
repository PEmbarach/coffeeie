import styles from "./App.module.css";
import NavBar from './components/NavBar';
import Container from "react-bootstrap/Container";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";


function App() {
  const { id } = useParams();
  const [post, serPost] = useState({ results: [] });

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1> } />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/posts/create" render={() => <PostCreateForm />} />
              <Route exact path="/posts/:id" render={()=> <PostPage />} />
              <Route render={() => <p>Page not Found!</p> } />
            </Switch>
          </Container>
        </div>
  );
}

export default App;