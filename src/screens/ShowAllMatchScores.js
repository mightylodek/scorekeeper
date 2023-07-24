import "../App.css";

//import { Routes, Route } from "react-router-dom";
//import Search from "./components/search";
import React, { useState, useEffect, useRef } from "react";
import * as Realm from "realm-web";
//import { FaCrown } from "react-icons/fa";
import { GiMeshBall } from "react-icons/gi";
import { Menu } from "../menu";
import { QRCodeSVG } from "qrcode.react";
import varObj from "../config.json";

const app = new Realm.App({ id: "real-time-tourney-yfwtp" });

/**
 * 
 * The below routes information is to be able to pass a match ID on the query string
 * Commented it out to test the realm connector to MongoDB for real-time updates
 *       <Routes>
        <Route path='search' element={<Search />} />
      </Routes>
 */

export function ShowAllMatchScores() {
  const [user, setUser] = useState();
  const [matches, setMatches] = useState([]);
  //const [bracketName, setBracketName] = useState("");
  //const [bracketRound, setBracketRound] = useState("");

  const stateRef = useRef();
  stateRef.current = matches;

  const fetchAndSetMatches = async (collection) => {
    try {
      const allMatches = await collection.find();
      if (allMatches.length > 0) {
        console.log("allMatches.length...", allMatches.length);
        console.log("pre-sorted...", allMatches);
        const sortedMatches = allMatches.sort((a, b) => {
          const aval =
            (a.bracketName === "Prelims" ? "1" : "2") +
            a.bracketRound +
            a.matchNumber;
          const bval =
            (b.bracketName === "Prelims" ? "1" : "2") +
            b.bracketRound +
            b.matchNumber;
          if (aval < bval) {
            return -1;
          } else {
            return 0;
          }
        });

        console.log("sorted matches...", sortedMatches);
        setMatches(sortedMatches);
        console.log("matches after setMatches()...", matches);
      } else {
        console.log("no records returned from DB");
      }
    } catch (e) {
      console.log("Error in fetchMatches...", e);
    }
  };

  /**
   *
   * This is a placeholder for when we update individual values within the updated match
   * ... for now we are simply re-fetching all match information any time there is an
   * ... upate to any match.
   
  const updateLocalMatches = (change) => {
    const updatedFields = change.updateDescription.updatedFields;
    console.log("matches in updateLocalMatches()...", matches);
    matches.map((obj) => {
      if (obj._id.toHexString() === change.documentKey._id.toHexString()) {
        console.log("matching record...", obj);
        const changedRecord = { ...obj, updatedFields };
        console.log("changedRecord", changedRecord);
        //setMatches(...matches, obj);
        console.log("matches after finding change...", matches);
      }
    });
  };

*/

  useEffect(() => {
    //console.clear();
    const login = async () => {
      //Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);

      //Connect to the database
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("node-api").collection("matches");

      // Fetch all matches and store them into the matches state variable
      fetchAndSetMatches(collection);

      //Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        fetchAndSetMatches(collection);
      }
    };
    login();
  }, []);

  return (
    <>
      <Menu />
      <div className='App'>
        {!!user && (
          <div className='App-header'>
            <div className='inline-block'>
              <h5>All Matches:</h5>
              {matches.map((e, i) => (
                <div className='center mb-8 border-gray-100 border-2 p-4 shadow-xl'>
                  <div
                    className='inline-block  p-1 rounded-md '
                    key={e._id.toHexString()}
                  >
                    <p>{e.eventName}</p>
                    <table className='score-table'>
                      <tbody className='teamPill'>
                        <tr>
                          <td className='prefix-icon'>
                            {e.winner === e.team1Name ? <GiMeshBall /> : ""}
                          </td>
                          <td className='teamName'>{e.team1Name}</td>
                          <td className='teamScore'>{e.team1Score}</td>
                        </tr>
                      </tbody>
                      <tbody className='teamPill'>
                        <tr>
                          <td className='prefix-icon'>
                            {e.winner === e.team2Name ? <GiMeshBall /> : ""}
                          </td>
                          <td className='text-red-400 w-0 text-left'>
                            {e.team2Name}
                          </td>
                          <td className='teamScore'>{e.team2Score}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='card-footer'>
                      <span className='keypair'>Bracket: {e.bracketName} </span>
                      <span className='keypair'>Round: {e.bracketRound} </span>
                      <span className='keypair'>Match: {e.matchNumber}</span>
                    </div>
                    <div>
                      <a
                        href={"index.html?screen=onematch&matchID=" + e._id}
                        target='_blank'
                      >
                        <span className='matchID'>
                          MatchID: {e._id.toHexString()}
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className='inline-block center ml-4 text-gray-500'>
                    <QRCodeSVG
                      value={`${varObj.scoreURL}?screen=onematch&matchID=${e._id}`}
                      fgColor='#0fa5e9'
                    />
                    <span className='text-sm'>Scan to score match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * 
                      <tr>
                        <td></td>
                        <td className='matchStatus'>
                          Match Status: {e.status ? e.status : ""}
                        </td>
                        <td></td>
                      </tr>
 */

/**
 * <div className='team'>
                    <span className='prefix-icon'>
                      {e.winner == e.team1Name ? <GiMeshBall /> : ""}
                    </span>
                    <span className='teamName'>Team 1: {e.team1Name}</span>
                    <span className='teamScore'>Score: {e.team1Score}</span>
                  </div>
                  <div className='team'>
                    <span className='prefix-icon'>
                      {e.winner == e.team2Name ? <GiMeshBall /> : ""}
                    </span>
                    <span className='teamName'>Team 2: {e.team2Name}</span>
                    <span className='teamScore'>Score: {e.team2Score}</span>
                  </div>
 * 
 * 
 */
