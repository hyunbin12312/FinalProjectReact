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
  width: 90%;
  text-align: center;
`;
export const PageButton = styled.button`
  width: 100px;
  margin: 25px;
`;
export const PageNo = styled.p`
  font-weight: 700;
  font-size: 20px;
  display: inline;
`;
export const CheckBox = styled.input``;

export const StyledTbody = styled.tbody`
  background-color: ${(props) => (props.checked ? "lightblue" : "transparent")};
`;
