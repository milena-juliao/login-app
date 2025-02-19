import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ButtonContainer,
    Container,
    DeleteButton,
    EditButton,
    Header,
    LogoutButton,
    UserInput,
    UserSelect,
    UserItem,
    UserList,
    UserInputContainer,
    SaveButton,
} from "../styles/ControleUsuarios.styled";
import api from "../services/api";
import FormUsuarios from "../components/FormUsuarios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTimes,
    faCheck,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

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
            console.log("Erro ao buscar usuários!");
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
            console.log("Usuário atualizado com sucesso!");
            setEditUser(null);
            buscaUsuarios();
        } catch (error) {
            console.log("Erro ao salvar usuário!");
        }
    };

    const handleDelete = async (email) => {
        try {
            await api.delete(`/users/${email}`, {
                headers: { Authorization: token },
            });
            console.log("Usuário removido com sucesso!");
            buscaUsuarios();
        } catch (error) {
            console.log("Erro ao remover usuário!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/");
    };

    return (
        <Container>
            <Header>
                <h1>
                    {userType === "admin"
                        ? "Gerenciamento de Usuários"
                        : "Listagem de Usuários"}
                </h1>
                <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
            </Header>

            {userType === "admin" && (
                <FormUsuarios token={token} saveUser={buscaUsuarios} />
            )}

            <UserList>
                <h2>Usuários</h2>
                {users.map((user) => (
                    <UserItem key={user.email}>
                        <UserInputContainer>
                            <UserInput
                                type="text"
                                value={
                                    editUser === user.email
                                        ? editData.name
                                        : user.name
                                }
                                disabled={editUser !== user.email}
                                onChange={(e) => handleChange(e, "name")}
                            />
                            <UserInput
                                type="email"
                                value={
                                    editUser === user.email
                                        ? editData.email
                                        : user.email
                                }
                                disabled={editUser !== user.email}
                            />
                            <UserSelect
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
                            </UserSelect>
                        </UserInputContainer>

                        {userType === "admin" && (
                            <ButtonContainer>
                                {editUser === user.email ? (
                                    <SaveButton onClick={handleSave}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </SaveButton>
                                ) : (
                                    <EditButton
                                        onClick={() => handleEdit(user)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </EditButton>
                                )}
                                <DeleteButton
                                    onClick={() => handleDelete(user.email)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </DeleteButton>
                            </ButtonContainer>
                        )}
                    </UserItem>
                ))}
            </UserList>
        </Container>
    );
};

export default ControleUsuarios;
