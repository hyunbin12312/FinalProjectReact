import styled from "styled-components";

export const WrapDiv = styled.div`
  margin-left: 280px;
`;
export const MemberTable = styled.table`
  width: 90%;
  border: 2px solid black;
`;
export const StyledTh = styled.th`
  background-color: lightgray;
  padding: 10px;
  &:hover {
    cursor: pointer;
    color: purple;
  }
`;
export const StyledTd = styled.td`
  padding: 10px;
`;
export const Button = styled.button`
  margin: 10px;
  border: none;
  width: 150px;
  height: 50px;
  background-color: gray;
  color: white;
  &:hover {
    background-color: purple;
  }
`;
export const PageDiv = styled.div`
  posotion: center;
`;
export const PageButton = styled.button`
  margin: 20px;
`;
export const PageNo = styled.p`
  display: inline;
`;
