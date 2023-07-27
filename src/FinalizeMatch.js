import React from "react";
import varObj from "./config.json";

export const patchMatchApiAsync = async (id, matchData) => {
  const rawResponse = await fetch(`${varObj.ioURL}/matches/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchData),
  });
  const content = await rawResponse.json();

  return content;
};

export const FinalizeMatch = (matchData) => {
  const matchId = matchData._id;
  const winByVal = matchData.winByTwo === true ? 2 : 1;
  const winningTeam =
    matchData.team1Score - matchData.team2Score - winByVal > 0
      ? "team1"
      : matchData.team2Score - matchData.team1Score - winByVal > 0
      ? "team2"
      : "No Winner";
  console.log("winningTeam...", winningTeam);
  const winningDiff =
    matchData.team1Score - matchData.team2Score - winByVal > 0
      ? matchData.team1Score - matchData.team2Score
      : matchData.team2Score - matchData.team1Score - winByVal > 0
      ? matchData.team2Score - matchData.team1Score
      : 0;
  console.log("winningDiff...", winningDiff);
  if (winningTeam === "No Winner") {
    console.log("No winning team for...", matchData);
    return;
  }

  const updatedData = {
    team1Name: matchData.team1Name,
    team1PlayerIds: matchData.team1PlayerIds,
    team1PlayerNames: matchData.team1PlayerNames,
    team2Name: matchData.team2Name,
    team2PlayerIds: matchData.team2PlayerIds,
    team2PlayerNames: matchData.team2PlayerNames,
    locationName: matchData.locationName,
    maxScore: matchData.maxScore,
    winByTwo: matchData.winByTwo,
    winnerName: winningTeam,
    wonBy: matchData.team1Score >= matchData.maxScore,
    matchStatus: "Final",
  };
  console.log(
    "finalize Match called with ...",
    matchId,
    updatedData,
    winningTeam,
    winningDiff
  );
  return patchMatchApiAsync(matchId, updatedData);
};
