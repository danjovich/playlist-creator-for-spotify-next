import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: black;
`;

export const SpotifyLogo = styled.img`
  width: 50%;
`;

export const LoginButton = styled.a`
  padding: 20px;
  border-radius: 99px;
  background-color: #1db954;
  font-weight: 600;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: white;
    border-color: #1db954;
    color: #1db954;
  }
`;
