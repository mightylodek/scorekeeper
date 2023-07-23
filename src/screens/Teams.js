import React from "react";
import { useState, useEffect } from "react";
import { Menu } from "../menu";
import styled from "styled-components";
import initialdata from "../initialdata";
import Players from "../Players";
import { createTeams, populateMatches } from "../kingsTeams";

const fleshOutMatchData = (arr, bracketRound, eventName) => {};

const showPrelimMatch = ({ roundData }) => {};

const Teams = ({ screen }) => {
  const [data, setData] = useState(initialdata);
  const [dataArray, setDataArray] = useState([]);
  const [justIds, setJustIds] = useState([]);
  const [ready, setReady] = useState(false);

  const Container = styled.div`
    background-color: #f4f5f8;
    display: flex;
    flex-direction: column;
  `;

  useEffect(() => {
    setData(initialdata);
    console.log("data...", data);
    console.log("data.players...", data.players);
    console.log("Object.values(data.players)", Object.values(data.players));
    setDataArray(data.players);
    const playerArray = Object.values(data.players);
    console.log("playerArray...", playerArray);
    let idArray = [];
    playerArray.forEach((player) => {
      idArray.push(player.id);
    });

    setJustIds(idArray);
    setReady(true);
  }, []);

  if (justIds.length === 0) {
    return;
  }
  if (!ready) {
    return;
  }

  console.log("justIds... in Teams ", justIds);
  const prelimMatchups = createTeams(justIds);
  console.log("prelimMatches...", prelimMatchups);

  const response = populateMatches(prelimMatchups[0], data.players, {
    eventName: "Kings Cup 2023",
    maxScore: 11,
    winByTwo: false,
    bracketName: "Prelims",
    bracketRound: "Round 1",
  });

  console.log("response from round one populateMatches...", response);

  return (
    <Container>
      <Menu screen={screen} />
      {prelimMatchups.map((e, i) => (
        <h3 key={i}>Prelims Round {i}</h3>
      ))}
    </Container>
  );
};
export default Teams;
