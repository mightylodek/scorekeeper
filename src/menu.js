import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  margin-top: 5px;
  background-color: #f4f5f8;
  display: flex;
  padding-top: 10px;
  padding-bottom: 5px;
  justify-content: center;
`;

export const LinkButton = styled.a`
  border-radius: 8px;
  padding: 1px 2px 2px 2px;
  margin: 2px;
  display: block;
  text-decoration: none;
  color: #f8fafc;
  width: 220px;
  text-align: center;
  background-color: #0fa5e9;
  height: 26px;
`;

export const Menu = ({ screen }) => {
  return (
    <>
      <Container>
        <LinkButton href='index.html?screen=allmatches'>All Matches</LinkButton>
        <LinkButton
          href={screen === "players" ? "#" : "index.html?screen=players"}
        >
          Players
        </LinkButton>
        <LinkButton href='index.html?screen=email'>Enter Email</LinkButton>
        <LinkButton href='index.html?screen=quickcreate'>
          Quick Create
        </LinkButton>
      </Container>
    </>
  );
};
