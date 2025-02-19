import { useState } from "react";
import api from "../services/api";
import AlertMessage from "./AlertMessage";
import {
    FormContainer,
    FormInput,
    FormSelect,
    SubmitButton,
} from "../styles/FormUsuarios.styled";

const FormUsuarios = ({ token, saveUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [type, setType] = useState("user");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(
                "/users",
                { email, name, type, password },
                {
                    headers: { Authorization: token },
                }
            );

            saveUser();
            setName("");
            setEmail("");
            setPassword("");
            setType("user");
        } catch (error) {
            setAlert(error.response?.data?.message);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <h2>Cadastrar novo usuário</h2>
            <div>
                <div>
                    <FormInput
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <FormInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FormInput
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FormSelect
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="user">Usuário</option>
                        <option value="admin">Admin</option>
                    </FormSelect>
                </div>
                <SubmitButton type="submit">Cadastrar</SubmitButton>
            </div>
            {alert && <AlertMessage typeAlert="danger" message={alert} />}
        </FormContainer>
    );
};

export default FormUsuarios;
