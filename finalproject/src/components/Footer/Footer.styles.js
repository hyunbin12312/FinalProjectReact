import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #f1f1f1;
  padding: 20px 40px;
  text-align: center;
  color: #333;
  position: relative;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
`;
