import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 70%;
    margin: auto;
    padding: 20px 0;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    color: #000;

    h2 {
        margin-left: 32px;
        font-size: 18px;
    }

    && > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 32px;
    }

    && > div > div {
        width: 80%;
    }
`;

export const FormInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    background: #fff;
    margin-right: 16px;
    color: #000;

    &:focus {
        border-color: #007bff;
        background: rgb(239, 249, 255);
    }
`;

export const FormSelect = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    background: #fff;
    color: #000;

    &:focus {
        border-color: #007bff;
    }
`;

export const SubmitButton = styled.button`
    width: 15%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;
