import styled from 'styled-components';

export const Description = styled.div`
  margin-top: 16px;
  text-align: justify;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #ef233c;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  border-radius: 4px;
  width: 250px;
  cursor: pointer;
`;

export const Button1 = styled.button`
  background-color: transparent;
  color: #ef233c;
  border: 2px solid #ef233c;
  margin-top: 5px;
  font-weight: bold;
  padding: 16px;
  font-size: 16px;
  border-radius: 4px;
  width: 250px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 250px;

  .name {
    margin-top: 12px;
    font-family: monospace;
  }
`;