import React from "react";
import styled from "styled-components";

// 검색 폼 컨테이너
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// 검색 입력창
const SearchInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;

// 검색 버튼
const SearchButton = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchTab = ({ inputPlace, setInputPlace, handleSearch }) => {
  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInput
        type="text"
        value={inputPlace}
        onChange={(e) => setInputPlace(e.target.value)}
        placeholder="장소를 입력하세요"
      />
      <SearchButton type="submit">검색</SearchButton>
    </SearchForm>
  );
};

export default SearchTab;
