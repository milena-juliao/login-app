import { AlertContainer } from "../styles/AlertMessage.styled";

const AlertMessage = ({ typeAlert, message }) => {
    return <AlertContainer typeAlert={typeAlert}>{message}</AlertContainer>;
};

export default AlertMessage;
