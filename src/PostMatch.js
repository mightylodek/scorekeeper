import React from "react";
import varObj from "./config.json";

export const DeleteMatchesByFilter = async (
  data = { filter: "not provided" }
) => {
  console.log("Data from DeleteMatchesByFilter...", data);
  if (data.filter === "not provided") {
    return { message: "No Filter was passed to DeleteMatchesByFilter..." };
  }
  const rawResponse = await fetch(`${varObj.ioURL}/matches`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();
  console.log(content);
};

const postMatchApiAsync = async (matchData = {}) => {
  const rawResponse = await fetch(`${varObj.ioURL}/matches`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchData),
  });
  const content = await rawResponse.json();

  return content;
};
/**
 *
 * @param {*} partialMD Partial match data, team names, event/bracket/round names, match number, etc
 * @returns content from the api call so error values or the succesful data-body
 */
const PostMatch = (partialMD) => {
  const matchData = {
    eventName: partialMD.eventName,
    bracketName: partialMD.bracketName,
    bracketRound: partialMD.bracketRound,
    matchNumber: partialMD.matchNumber,
    team1Name: partialMD.team1Name,
    team1PlayerIds: partialMD.team1PlayerIds,
    team1PlayerNames: partialMD.team1PlayerNames,
    team2Name: partialMD.team2Name,
    team2PlayerIds: partialMD.team2PlayerIds,
    team2PlayerNames: partialMD.team2PlayerNames,
    locationName: null,
    team1Score: 0,
    team2Score: 0,
    maxScore: partialMD.maxScore,
    winByTwo: partialMD.winByTwo,
    winnerName: null,
    wonBy: null,
    winnerNextMatch: null,
    winnerNextMatchPosition: null,
    loserNextMatch: null,
    loserNextMatchPosition: null,
    status: partialMD.status,
  };
  console.log("matchData...", matchData);
  return postMatchApiAsync(matchData);
};

export default PostMatch;
