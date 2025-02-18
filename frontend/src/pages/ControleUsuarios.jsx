import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ControleUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        email: "",
        name: "",
        type: "",
        password: "",
    });
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    console.log(token);

    // useEffect(() => {
    //     try {
    //         if (!token) {
    //             console.log("Redirecionando para login...");
    //             navigate("/");
    //             return;
    //         }

    //         console.log("Buscando usuários...");
    //         buscaUsuarios();
    //     } catch (error) {
    //         console.error("Erro no useEffect:", error);
    //     }
    // }, [token]);

    const buscaUsuarios = async () => {
        try {
            const response = await api.get("/users", {
                headers: { Authorization: token },
            });
            setUsers(response.data);
        } catch (error) {
            alert("Erro ao buscar usuários!");
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await api.post("/users", newUser, {
                headers: { Authorization: token },
            });
            buscaUsuarios();
        } catch (error) {
            alert("Erro ao adicionar usuário!");
        }
    };

    return (
        <div>
            <h2>Usuários</h2>
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                    }
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                    }
                    required
                />
                <input
                    type="text"
                    placeholder="Tipo"
                    onChange={(e) =>
                        setNewUser({ ...newUser, type: e.target.value })
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                    }
                    required
                />
                <button type="submit">Adicionar Usuário</button>
            </form>

            <ul>
                {users.map((user) => (
                    <li key={user.email}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ControleUsuarios;
