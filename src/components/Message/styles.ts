import styled from 'styled-components';

export const Container = styled.div`
  
`;

export interface Props {
  send: any;
}

export const Form = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 250px;

  .input {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 5px 0px 4px 0px;
      
      label {
        color: ${props => props.send ? "#affc41" : "#ef233c"};
        font-size: 0.7rem;
        margin: 4px 0px 4px 0px;
        font-weight: bold;
        text-transform: uppercase;
      }
    
      input {
        border: none;
        outline: none;
        width: 100%;
        background-color: transparent;
        border: 2px solid #212121;
        padding: 10px 10px 10px 10px;
        height: 2.5rem;
        color: #000;
        font-size: 0.9rem;
        border-radius: 4px;
        transition: all 300ms ease;
        &:focus {
          border: 2px solid  ${props => props.send ? "#affc41" : "#ef233c"};
        }
        @media screen and (max-width: 450px) {
          width: auto;
        }
      }
      textarea {
        border: none;
        outline: none;
        width: 100%;
        background-color: transparent;
        border: 2px solid #212121;
        padding: 10px 10px 10px 10px;
        height: 10rem;
        color: #000;
        resize: none;
        font-size: 0.9rem;
        border-radius: 4px;
        transition: all 300ms ease;
        &:focus {
          border: 2px solid  ${props => props.send ? "#affc41" : "#ef233c"};
        }
        @media screen and (max-width: 450px) {
          width: auto;
        }
      }
    }


  button {
    background-color: ${props => props.send ? "#affc41" : "#ef233c"};
    border: none;
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    border-radius: 4px;
    width: 100%;
    margin-top: 30px;
    cursor: pointer;
  }
`;