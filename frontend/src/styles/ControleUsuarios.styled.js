import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin-top: 60px;
`;

export const Header = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #090333;
    color: white;
    z-index: 1000;

    h1 {
        font-size: 24px;
        margin: 32px;
    }
`;

export const LogoutButton = styled.button`
    width: 100px;
    padding: 10px 0px;
    background: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-right: 32px;

    &:hover {
        background: darkred;
    }
`;

export const UserList = styled.ul`
    width: 65%;
    list-style: none;
    padding: 0;
    margin: 32px auto;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    background: #f8f9fa;
    padding: 32px;
    color: #000;

    h2 {
        font-size: 18px;
        margin-bottom: 16px;
    }
`;

export const UserItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    &&:not(:last-child) {
        margin-bottom: 16px;
    }
`;

export const UserInputContainer = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const UserInput = styled.input`
    padding: 8px;
    border: 1px solid #007bff;
    border-radius: 5px;
    width: 80%;
    color: #000;
    background: #fff;

    &:disabled {
        background: #e9ecef;
        border: 1px solid rgb(122, 124, 126);
        color: rgb(122, 124, 126);
    }
`;

export const UserSelect = styled.select`
    padding: 8px;
    border: 1px solid #007bff;
    border-radius: 5px;
    width: 20%;
    color: #000;
    background: #fff;

    &:disabled {
        background: #e9ecef;
        border: 1px solid rgb(122, 124, 126);
        color: rgb(122, 124, 126);
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 16px;
`;

export const EditButton = styled.button`
    color: black;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: none;
    padding: 0;
    font-size: 18px;
    width: 20px;

    &&:focus {
        outline: none;
    }
`;

export const SaveButton = styled(EditButton)`
    color: #28a745;
`;

export const DeleteButton = styled.button`
    color: #dc3545;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: none;
    padding: 0;
    font-size: 18px;
    width: 20px;

    &&:focus {
        outline: none;
    }
`;
