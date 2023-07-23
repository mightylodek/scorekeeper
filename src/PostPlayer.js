import React from "react";
import varObj from "./config.json";

const postPlayerApiAsync = async (playerData = {}) => {
  const rawResponse = await fetch(`${varObj.ioURL}/kcplayer`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playerData),
  });
  const content = await rawResponse.json();

  return content;
};
/**
 *
 * @param {*} playerData
 * @returns content from the api call so error values or the succesful data-body
 */
export const PostPlayer = (playerData) => {
  const playerData = {
    id: playerData.id,
    name: playerData.name,
    wins: playerData.wins,
    losses: playerData.losses,
    pdiff: playerData.pdiff,
    seed: playerData.seed,
  };
  console.log("playerData...", playerData);
  return postPlayerApiAsync(playerData);
};

const patchPlayerApiAsync = async (playerData = {}) => {
  const rawResponse = await fetch(`${varObj.ioURL}/kcplayer/id`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playerData),
  });
  const content = await rawResponse.json();

  return content;
};
/**
 *
 * @param {*} playerData
 * @returns content from the api call so error values or the succesful data-body
 */
export const PatchPlayer = (playerData) => {
  const playerData = {
    id: playerData.id,
    name: playerData.name,
    wins: playerData.wins,
    losses: playerData.losses,
    pdiff: playerData.pdiff,
    seed: playerData.seed,
  };
  console.log("playerData...", playerData);
  return postPlayerApiAsync(playerData);
};
