//import React from "react";
export const FetchOneMatch = async (id) => {
  console.log("Entered into FetchOneMatch with id: ", id);
  try {
    const response = await fetch(`https://tourneyrun.com:30443/matches/${id}`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.warn(e);
    return null;
  }
};
