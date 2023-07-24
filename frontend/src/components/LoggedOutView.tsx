import { Button } from "react-bootstrap";

interface LoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const LoggedOutView = ({ onSignUpClicked, onLoginClicked }: LoggedOutViewProps) => {
    return (
        <>
            <Button variant="dark" onClick={onSignUpClicked}>Sign Up</Button>
            <Button variant="dark" onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default LoggedOutView;