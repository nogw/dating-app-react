import styled from 'styled-components';


export const Button1 = styled.button`
  background-color: transparent;
  color: #ef233c;
  border: 1px solid #ef233c;
  padding: 12px;
  font-size: 16px;
  border-radius: 4px;
  width: 250px;
  margin-bottom: 40px;
  margin-top: 20px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 250px;

  h1 {
    margin-top: 12px;
    font-family: monospace;
  }
  
  p {
    margin-top: 16px;
    text-align: justify;
  }

  .messageContainer {
    display: flex;
    width: 250px;
    flex-direction: column;
    border: 1px solid #ef233c;
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 3px;

    .title {
      display: flex;

      h1 {
        font-size: 16px;
        margin-top: 0px;
      }

      h1:first-child {
        margin-right: auto;
      }
    }

    .num {
      p {
        font-weight: bold;
        font-size: 13px;
        margin-top: 0px;
        margin-bottom: 20px;
      }
    }
  }
`;
