import styled from "styled-components";

export const Title = styled.h1`
  margin-top: 50px;
  font-weight: 700;
`;
export const StyledDiv = styled.div`
  text-align: center;
  margin-top: 150px;
`;
export const CommonContainer = styled.div`
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 600px;
  height: auto;
  min-height: 500px;
`;
export const Form = styled.form`
  margin-top: 80px;
`;
export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 70%;
`;
export const Btn = styled.button`
  width: 70%;
  height: 45px;
  border: none;
  border-radius: 2px;
`;
export const Atag = styled.a`
  margin: 25px;
  &:hover {
    cursor: pointer;
    color: purple;
  }
`;
