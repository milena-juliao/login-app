import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    && > div {
        width: 20%;
        text-align: center;
    }
`;

export const LoginForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`;

export const LoginInput = styled.input`
    width: 100%;
    padding: 15px 10px;
    border: 2px solid #0056b3;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    background: #fff;
    text-align: center;
    color: #000;
    transition: ease-out 0.3s;

    &:focus {
        box-shadow: 0 0 5px rgb(122, 186, 255);
        transform: scale(1.05);
    }
`;

export const LoginButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 32px;
    transition: ease-out 0.5s;

    &:hover {
        background-color: #000218;
        box-shadow: 0 0 5px rgb(70, 157, 250);
    }
`;
