import { Button } from "react-bootstrap";

interface LoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const LoggedOutView = ({ onSignUpClicked, onLoginClicked }: LoggedOutViewProps) => {
    return (
        <>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
            <Button onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default LoggedOutView;