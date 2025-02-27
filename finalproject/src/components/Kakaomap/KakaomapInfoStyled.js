import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  align-items: flex-start;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  max-width: 400px;
`;

export const CenterContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RightContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
`;

export const SearchAndButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const StyledButton = styled.button`
  padding: 10px 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  color: #333;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #f7f7f7;
    border-color: #ccc;
  }

  &:disabled {
    background-color: #f7f7f7;
    border-color: #eee;
    color: #999;
    cursor: default;
  }
`;

export const LoadMoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const SubmitButton = styled(StyledButton)`
  margin-top: 10px;
  width: 100%;
`;
