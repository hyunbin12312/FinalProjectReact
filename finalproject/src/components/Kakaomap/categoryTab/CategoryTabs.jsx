// src/categoryTab/CategoryTabs.jsx
import React from "react";
import styled from "styled-components";

const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
`;

const CategoryTab = styled.button`
  padding: 8px 12px;
  background-color: ${({ active }) => (active ? "#007bff" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const CategoryTabs = ({
  categories,
  selectedCategory,
  onSelectCategory,
  setInputPlace,
  onCategoryClick, // 카테고리 클릭 시 호출되는 함수
}) => {
  return (
    <CategoryContainer>
      {categories.map((cat) => (
        <CategoryTab
          key={cat}
          active={selectedCategory === cat}
          onClick={() => {
            onSelectCategory(cat);
            setInputPlace(cat);
            if (onCategoryClick) {
              onCategoryClick(cat);
            }
          }}
        >
          {cat}
        </CategoryTab>
      ))}
    </CategoryContainer>
  );
};

export default CategoryTabs;
