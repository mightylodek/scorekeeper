import "./App.css";
import { useState, useEffect } from "react";
import { ShowAllMatchScores } from "./screens/ShowAllMatchScores";
import Match from "./screens/match";
import Landing from "./Landing";
import Players from "./Players";
import Teams from "./screens/Teams";
import Email from "./playground/email";
import QuickCreate from "./screens/QuickCreate";

function App() {
  const [matchID, setMatchID] = useState(" ");
  const [eventID, setEventID] = useState(" ");
  const [screen, setScreen] = useState("default");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const urlSearchString = window.location.search;

    const params = new URLSearchParams(urlSearchString);

    setMatchID(
      params.get("matchID") === null ? "default" : params.get("matchID")
    );
    setEventID(
      params.get("eventID") === null ? "default" : params.get("eventID")
    );
    setScreen(params.get("screen") === null ? "default" : params.get("screen"));

    setReady(true);
  }, []);

  if (!ready) return;

  switch (screen) {
    case "players":
      return <Players screen={`${screen}`} />;
      break;
    case "allmatches":
      return <ShowAllMatchScores screen={screen} />;
      break;
    case "onematch":
      return <Match matchID={matchID} eventID={eventID} screen={screen} />;
      break;
    case "teams":
      return <Teams />;
      break;
    case "email":
      return <Email />;
      break;
    case "quickcreate":
      return <QuickCreate />;
      break;
    default:
      return <Landing screen={screen} />;
      break;
  }
}

export default App;
