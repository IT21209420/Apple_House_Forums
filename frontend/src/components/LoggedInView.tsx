import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as PostApi from "../network/posts_api";

interface LoggeInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const LoggeInView = ({ user, onLogoutSuccessful }: LoggeInViewProps) => {

    async function logout() {
        try {
            await PostApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.email}
            </Navbar.Text>
            <Button variant="dark" onClick={logout}>Log out</Button>
        </>
    );
}

export default LoggeInView;