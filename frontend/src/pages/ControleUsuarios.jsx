import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import FormUsuarios from "../components/FormUsuarios";

const ControleUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [editData, setEditData] = useState({});
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        buscaUsuarios();
    }, [token]);

    const buscaUsuarios = async () => {
        try {
            const response = await api.get("/listUsers", {
                headers: { Authorization: token },
            });
            setUsers(response.data);
        } catch (error) {
            alert("Erro ao buscar usuários!");
        }
    };

    const handleEdit = (user) => {
        setEditUser(user.email);
        setEditData({ ...user });
    };

    const handleChange = (e, field) => {
        setEditData({ ...editData, [field]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await api.put(
                `/users/${editData.email}`,
                { name: editData.name, type: editData.type },
                {
                    headers: { Authorization: token },
                }
            );
            alert("Usuário atualizado com sucesso!");
            setEditUser(null);
            buscaUsuarios();
        } catch (error) {
            alert("Erro ao salvar usuário!");
        }
    };

    const handleDelete = async (email) => {
        try {
            await api.delete(`/users/${email}`, {
                headers: { Authorization: token },
            });
            alert("Usuário removido com sucesso!");
            buscaUsuarios();
        } catch (error) {
            alert("Erro ao remover usuário!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/");
    };

    return (
        <div>
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>
                    {" "}
                    {userType === "admin"
                        ? "Gerenciamento de Usuários"
                        : "Visualizar Usuários"}
                </h1>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: "8px",
                        background: "red",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Sair
                </button>
            </header>

            <FormUsuarios token={token} saveUser={buscaUsuarios} />

            <ul>
                {users.map((user) => (
                    <li
                        key={user.email}
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        <input
                            type="text"
                            value={
                                editUser === user.email
                                    ? editData.name
                                    : user.name
                            }
                            disabled={editUser !== user.email}
                            onChange={(e) => handleChange(e, "name")}
                        />
                        <input type="email" value={user.email} disabled />
                        <select
                            value={
                                editUser === user.email
                                    ? editData.type
                                    : user.type
                            }
                            disabled={editUser !== user.email}
                            onChange={(e) => handleChange(e, "type")}
                        >
                            <option value="user">Usuário</option>
                            <option value="admin">Admin</option>
                        </select>

                        {userType === "admin" && (
                            <>
                                {editUser === user.email ? (
                                    <button onClick={handleSave}>Salvar</button>
                                ) : (
                                    <button onClick={() => handleEdit(user)}>
                                        Editar
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(user.email)}
                                >
                                    Excluir
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ControleUsuarios;
