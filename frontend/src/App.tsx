import { Container } from "react-bootstrap";
import styles from "./styles/postPage.module.css";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import RegisterModal from "./components/RegisterModal";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as PostsApi from "./network/posts_api";
import PostsPageLoggedInView from "./components/PostsPageLoggedInView";
import PostsPageLoggedOutView from "./components/PostsPageLoggedOutView";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import AllPostsPage from "./pages/AllPostsPage";
import ToBeApprovedPosts from "./pages/ToBeApprovedPosts";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await PostsApi.getLoggedUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => {
          setShowLoginModal(true);
        }}
        onLogoutSuccessful={() => {
          setLoggedInUser(null);
        }}
        onSignUpClicked={() => {
          setShowRegisterModal(true);
        }}
      />
      <Container className={styles.postsPage} style={{padding: "32px"}}>
       
        <Routes>
						<Route
							path='/'
							element={<AllPostsPage loggedInUser={loggedInUser} />}
						/>
						<Route
							path='/myposts'
							element={<PostsPage loggedInUser={loggedInUser} />}
						/>
						<Route
							path='/tobeapproved'
							element={<ToBeApprovedPosts loggedInUser={loggedInUser} />}
						/>
            <Route
							path='/*'
							element={<>Not found</> }
						/>
            
					</Routes>
      </Container>
      {showRegisterModal && (
        <RegisterModal
          onDismiss={() => {
            setShowRegisterModal(false);
          }}
          onRegisterSuccessful={(user) => {
            setLoggedInUser(user);
            setShowRegisterModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => {
            setShowLoginModal(false);
          }}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
    </BrowserRouter>
  );
}

export default App;
