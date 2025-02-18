import { useState } from "react";
import api from "../services/api";

const FormUsuarios = ({ token, saveUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            alert("Erro ao salvar usuário: " + error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="user">Usuário</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default FormUsuarios;
