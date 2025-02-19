import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AlertMessage from "../components/AlertMessage";
import {
    LoginButton,
    LoginContainer,
    LoginForm,
    LoginInput,
} from "../styles/Login.styled";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import planet from "../../public/planet.json";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userType", response.data.type);
            navigate("/users");
        } catch (error) {
            setAlert(error.response.data.message);
        }
    };

    return (
        <LoginContainer>
            <DotLottieReact
                data={planet}
                autoplay
                loop
                speed={0.3}
                style={{ width: 100, height: 100 }}
            />
            <div>
                <h2>Login</h2>
                <LoginForm onSubmit={handleLogin}>
                    <LoginInput
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <LoginInput
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {alert !== "" && (
                        <AlertMessage typeAlert={"warning"} message={alert} />
                    )}
                    <LoginButton type="submit">Entrar</LoginButton>
                </LoginForm>
            </div>
        </LoginContainer>
    );
};

export default Login;
