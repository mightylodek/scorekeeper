import { useState, useEffect, useRef } from "react";
import React from "react";
import { FetchOneMatch } from "../FetchOneMatch";
import { GiMeshBall } from "react-icons/gi";
import { LuMinusSquare } from "react-icons/lu";
import { LuPlusSquare } from "react-icons/lu";
import "../App.css";
import varObj from "../config.json";

import * as Realm from "realm-web";

const app = new Realm.App({ id: "real-time-tourney-yfwtp" });

const patchMatchApiAsync = async (id, obj) => {
  const rawResponse = await fetch(`${varObj.ioURL}/matches/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const content = await rawResponse.json();
  return content;
};

const Match = ({ matchID, eventID }) => {
  const [m, setM] = useState({});
  const [ready, setReady] = useState(false);
  const stateRef = useRef();
  stateRef.current = m;

  console.log("matchID in Match()...", matchID);
  console.log("eventID in Match()...", eventID);

  const fetchAndSetMatch = async (collection) => {
    console.log("Entered fetchandSetMatch...");
    const matchData = await FetchOneMatch(matchID);
    console.log("matchData after FetchOneMatch...", matchData);
    setM(matchData);
    console.log("m after setM...", m);
  };

  useEffect(() => {
    console.warn("matchID in Match()...", matchID);
    const login = async () => {
      //Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      //setUser(user);

      //Connect to the database
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("node-api").collection("matches");

      // Fetch all matches and store them into the matches state variable
      fetchAndSetMatch(collection);

      //Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        fetchAndSetMatch(collection);
      }
    };
    login();
    setReady(true);
  }, []);

  console.log("matchID from useLoaderData()...", matchID);

  if (ready === false) {
    return;
  }

  try {
    return (
      <>
        <div className='App-header'>
          <h3>
            {m.bracketName ? m.bracketName : ""}{" "}
            {m.bracketRound ? m.bracketRound : ""}{" "}
            {m.matchNumber ? "Match# " + m.matchNumber : ""}
          </h3>

          <table>
            <tbody className='teamPill'>
              <tr>
                <td className='prefix-icon'>
                  {m.winner === m.team1Name ? <GiMeshBall /> : ""}
                </td>
                <td className='teamName'>{m.team1Name}</td>
                <td className='teamScore'>{m.team1Score}</td>
                <td className='plusMinus'>
                  <button
                    className='plusMinusButton t1'
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Clicked Minus T1");
                      patchMatchApiAsync(m._id, {
                        team1Score: m.team1Score - 1,
                      });
                      //fetchAndSetMatch(m._id);
                    }}
                  >
                    <LuMinusSquare />
                  </button>
                </td>
                <td className='plusMinus'>
                  <button
                    className='plusMinusButton t1'
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Clicked Plus T1");
                      patchMatchApiAsync(m._id, {
                        team1Score: m.team1Score + 1,
                      });
                      //fetchAndSetMatch(m._id);
                    }}
                  >
                    <LuPlusSquare />
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody className='teamPill'>
              <tr>
                <td className='prefix-icon'>
                  {m.winner === m.team2Name ? <GiMeshBall /> : ""}
                </td>
                <td className='teamName'>{m.team2Name}</td>
                <td className='teamScore'>{m.team2Score}</td>
                <td className='plusMinus'>
                  <button
                    className='plusMinusButton t2'
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Clicked Minus T2");
                      patchMatchApiAsync(m._id, {
                        team2Score: m.team2Score - 1,
                      });
                      //fetchAndSetMatch(m._id);
                    }}
                  >
                    <LuMinusSquare />
                  </button>
                </td>
                <td className='plusMinus'>
                  <button
                    className='plusMinusButton t2'
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Clicked Plus T2");
                      patchMatchApiAsync(m._id, {
                        team2Score: m.team2Score + 1,
                      });
                      //fetchAndSetMatch(m._id);
                    }}
                  >
                    <LuPlusSquare />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button className=''>Finalize</button>
          </div>
        </div>
      </>
    );
  } catch (e) {
    return (
      <>
        <h3>No match found</h3>
        <h4>`Error Message: ${e}`</h4>
      </>
    );
  }
};

export default Match;
