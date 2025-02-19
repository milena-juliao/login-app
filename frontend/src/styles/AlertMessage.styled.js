import styled from "styled-components";

export const AlertContainer = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.typeAlert === "danger"
            ? "#ff4444"
            : props.typeAlert === "warning"
            ? "#ffc107"
            : "#00C851"};
    color: white;
    text-align: center;
    font-size: 14px;
    margin: 10px 0;
`;
