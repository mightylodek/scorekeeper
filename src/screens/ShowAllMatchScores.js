import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import * as Realm from "realm-web";
import { GiMeshBall } from "react-icons/gi";
import { Menu } from "../menu";
import { QRCodeSVG } from "qrcode.react";
import varObj from "../config.json";
import initialdata from "../initialdata";
import { patchMatchApiAsync } from "../FinalizeMatch";

const app = new Realm.App({ id: "real-time-tourney-yfwtp" });

/**
 * 
 * The below routes information is to be able to pass a match ID on the query string
 * Commented it out to test the realm connector to MongoDB for real-time updates
 *       <Routes>
        <Route path='search' element={<Search />} />
      </Routes>
 */

const handleCourtSelection = async (e) => {
  e.preventDefault();
  const matchId = e.nativeEvent.target.dataset.matchid;
  const startTime = new Date();
  const matchLocation = {
    locationName: `${e.nativeEvent.target.value}`,
    startTime: `${startTime}`,
  };

  const result = await patchMatchApiAsync(matchId, matchLocation);
  console.log("did it patch?", matchId, result);
};

const QRSkeleton = () => {
  return (
    <div className='animate-pulse space-x-4 inline-block'>
      <div className='rounded bg-sky-400 h-32 w-32 grid grid-cols-5 grid-rows-5'>
        <div className='rounded bg-sky-500  col-span-1 row-span-1'></div>
        <div className='bg-transparent col-span-3 row-span-1'></div>
        <div className='rounded bg-sky-500  col-span-1 row-span-1'></div>
        <div className='rounded bg-transparent col-span-5 row-span-3'></div>
        <div className='rounded bg-sky-500  col-span-1 row-span-1'></div>
      </div>
    </div>
  );
};

const FinalQRPlaceholder = () => {
  return (
    <div className='flex flex-col items-center justify-center my-6'>
      <p className='text-xxl text-red-600'>Final Score</p>
    </div>
  );
};

export function ShowAllMatchScores() {
  const [user, setUser] = useState();
  const [matches, setMatches] = useState([]);
  const [locations, setLocations] = useState(initialdata.Locations);
  //const [bracketName, setBracketName] = useState("");
  //const [bracketRound, setBracketRound] = useState("");

  const stateRef = useRef();
  stateRef.current = matches;

  const fetchAndSetMatches = async (collection) => {
    try {
      const allMatches = await collection.find();
      if (allMatches.length > 0) {
        const sortedMatches = await allMatches.sort((a, b) => {
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

        setMatches(sortedMatches);
        console.log("matches...", matches);
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

  const handleOverrideMatch = async (matchId) => {
    console.log("Handle override of match...", matchId);
    const data = { matchStatus: "Reopened" };
    const result = await patchMatchApiAsync(matchId, data);
    console.log("Override result...", matchId, result);
  };

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
      await fetchAndSetMatches(collection);

      //Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        await fetchAndSetMatches(collection);
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
                <div
                  className={
                    e.matchStatus === "Final"
                      ? "bg-slate-200 center m-2 mb-8 border-slate-300 border-2 p-4 shadow-xl"
                      : "center m-2 mb-8 border-gray-100 border-2 p-4 shadow-xl"
                  }
                  key={e._id.toHexString()}
                >
                  <div className='inline-block  p-1 rounded-md '>
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
                        href={
                          `index.html?screen=onematch&matchID=${e._id}` +
                          (e.locationName !== null
                            ? `&location=${e.locationName}`
                            : "")
                        }
                        target='_blank'
                      >
                        <span className='matchID'>
                          MatchID: {e._id.toHexString()}
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className='inline-block center ml-4 text-gray-500'>
                    {e.matchStatus === "Final" ? (
                      <div
                        className='z-10 h-max w-max'
                        data-matchid={e._id}
                        onClick={() => handleOverrideMatch(e._id.toHexString())}
                      >
                        <div className='items-center p-4 bg-slate-700 inline-block hover:bg-slate-600'>
                          <FinalQRPlaceholder />
                          <div className='block'>
                            <span className='text-sm text-slate-300'>
                              Click to override
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : e.locationName === "Unassigned" ? (
                      <div className='items-center'>
                        <QRSkeleton />
                        <div className='block'>
                          <span className='text-sm'>
                            Select location to score match
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center'>
                        <QRCodeSVG
                          value={
                            `index.html?screen=onematch&matchID=${e._id}` +
                            (e.locationName !== null
                              ? `&location=${e.locationName}`
                              : "")
                          }
                          fgColor='#0fa5e9'
                        />
                        <div className='block mt-2'>
                          <span className='text-sm block'>
                            Scan QRCode to score match
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=''>
                    <select
                      data-matchid={e._id}
                      onChange={(e) => handleCourtSelection(e)}
                      value={e.locationName}
                      className={
                        e.locationName === "Unassigned"
                          ? "animate-pulse border-none bg-opacity-5 enabled:bg-sky-500 disabled:bg-transparent"
                          : "border-none bg-opacity-5 enabled:bg-sky-500 disabled:bg-transparent"
                      }
                      disabled={e.matchStatus === "Final" ? true : false}
                    >
                      <option value='Unassigned'>
                        Select a location to begin
                      </option>
                      {locations.map((l, j) => (
                        <option key={j} value={l}>
                          Location: {l}
                        </option>
                      ))}
                    </select>
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
