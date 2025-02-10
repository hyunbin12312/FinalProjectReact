import React from "react";
import styled from "styled-components";

// 검색 폼 컨테이너 (모던하고 깔끔한 느낌)
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding: 12px 16px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

// 검색 입력창 (심플하고 깔끔하게)
const SearchInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;

// 검색 버튼 (모던한 버튼 스타일)
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

const SearchTab = ({
  inputPlace,
  setInputPlace,
  handleSearch,
  handleReset,
}) => {
  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInput
        type="text"
        value={inputPlace}
        onChange={(e) => setInputPlace(e.target.value)}
        placeholder="장소를 입력하세요"
      />
      <SearchButton type="submit">검색</SearchButton>
      <SearchButton type="button" onClick={handleReset}>
        초기화
      </SearchButton>
    </SearchForm>
  );
};

export default SearchTab;
