import React from "react";
import { useState, useEffect } from "react";
import { Menu } from "./menu";
import styled from "styled-components";
import initialdata from "./initialdata";
import { DeleteMatchesByFilter } from "./PostMatch";
import { createTeams, populateMatches } from "./kingsTeams";
//import { ShowAllMatchScores } from "./screens/ShowAllMatchScores";

export const Container = styled.div`
  background-color: #f4f5f8;
  display: flex;
  flex-direction: column;
`;

const Pinput = styled.input`
  margin: 5px;
  padding: 2px;
  background-color: transparent;
  font-size: 12px;
  height: 20px;
  display: inline;
  width: 50px;
  font-weight: 400;
`;

const Pspan = styled.span`
  margin: 5px;
  padding: 2px;
  background-color: transparent;
  font-size: 12px;
  height: 20px;
  display: inline-block;
  width: 55px;
  font-weight: 700;
`;

const Pnamespan = styled.span`
  margin: 5px;
  padding: 2px;
  background-color: transparent;
  font-size: 12px;
  height: 20px;
  display: inline-block;
  width: 120px;
  font-weight: 700;
`;

const Pnameinput = styled.input`
  margin: 5px;
  padding: 2px;
  background-color: transparent;
  font-size: 12px;
  height: 20px;
  display: inline;
  width: 120px;
  font-weight: 700;
`;

const Plabel = styled.label`
  font-size: 12px;
  display: none;
`;

const generateMatches = (e, playerArray) => {
  e.preventDefault();
  let idArray = [];
  playerArray.forEach((player) => {
    idArray.push(player.id);
  });

  console.log("idArray... in Teams ", idArray);
  const prelimMatchups = createTeams(idArray);
  console.log("prelimMatches...", prelimMatchups);

  const response1 = populateMatches(prelimMatchups[0], playerArray, {
    eventName: "Kings Cup 2023",
    maxScore: 11,
    winByTwo: false,
    bracketName: "Prelims",
    bracketRound: "Round 1",
  });

  const response2 = populateMatches(prelimMatchups[1], playerArray, {
    eventName: "Kings Cup 2023",
    maxScore: 11,
    winByTwo: false,
    bracketName: "Prelims",
    bracketRound: "Round 2",
  });

  const response3 = populateMatches(prelimMatchups[2], playerArray, {
    eventName: "Kings Cup 2023",
    maxScore: 11,
    winByTwo: false,
    bracketName: "Prelims",
    bracketRound: "Round 3",
  });

  const response4 = populateMatches(prelimMatchups[3], playerArray, {
    eventName: "Kings Cup 2023",
    maxScore: 11,
    winByTwo: false,
    bracketName: "Prelims",
    bracketRound: "Round 4",
  });
  return [response1, response2, response3, response4];
};

const PlayerHeader = ({
  addNewPlayer,
  headerSort,
  generateMatches,
  dataArray,
}) => {
  return (
    <div>
      <Pnamespan onClick={headerSort} data-sortheader='name'>
        Name
      </Pnamespan>
      <Pspan onClick={headerSort} data-sortheader='wins'>
        Wins
      </Pspan>
      <Pspan onClick={headerSort} data-sortheader='losses'>
        Losses
      </Pspan>
      <Pspan onClick={headerSort} data-sortheader='pdiff'>
        P-Diff
      </Pspan>
      <Pspan onClick={headerSort} data-sortheader='seed'>
        Seed
      </Pspan>
      <Pspan onClick={headerSort} data-sortheader='id'>
        ID
      </Pspan>
      <button
        className='bg-blue-200 p-1 rounded-md mb-1 w-24 mr-2'
        onClick={addNewPlayer}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-4 h-4 inline-block'
        >
          <path
            fillRule='evenodd'
            d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z'
            clipRule='evenodd'
          />
        </svg>
        <span className='text-sm'>Add Player</span>
      </button>
      <button
        className='bg-blue-200 p-1 rounded-md mb-1 mr-2 w-36'
        onClick={(e) => generateMatches(e, dataArray)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 inline-block'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
          />
        </svg>

        <span className='text-sm'> Create Matches</span>
      </button>
      <button
        className='bg-blue-200 p-1 rounded-md mb-1 w-36'
        onClick={() =>
          DeleteMatchesByFilter({ eventName: "Kings Cup 2023" }).then(
            (response) =>
              console.log("Response from DeleteMatchesByFilter...", response)
          )
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4  inline-block'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
          />
        </svg>

        <span className='text-sm'> Delete Matches</span>
      </button>
    </div>
  );
};

export const OnePlayer = ({ p, w, l, d, s, handleChange }) => {
  return (
    <form
      id={`${p.id}-form`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={p.seed <= 4 && p.seed > 0 ? "bg-amber-50" : "bg-inherit"}
    >
      <Plabel htmlFor={`${p.id}-name`}>Name</Plabel>{" "}
      <Pnameinput
        id={`${p.id}-name`}
        data-personid={`${p.id}`}
        data-personfield='name'
        type='text'
        defaultValue={`${p.name}`}
        onBlur={handleChange}
      />
      <Plabel htmlFor={`${p.id}-wins`}>Wins</Plabel>{" "}
      <Pinput
        id={`${p.id}-wins`}
        data-personid={`${p.id}`}
        data-personfield='wins'
        type='text'
        value={`${p.wins}`}
        onChange={handleChange}
      />
      <Plabel htmlFor={`${p.id}-losses`}>Losses</Plabel>{" "}
      <Pinput
        id={`${p.id}-losses`}
        data-personid={`${p.id}`}
        data-personfield='losses'
        type='text'
        value={`${p.losses}`}
        onChange={handleChange}
      />
      <Plabel htmlFor={`${p.id}-pdiff`}>Pdiff</Plabel>{" "}
      <Pinput
        id={`${p.id}-pdiff`}
        data-personid={`${p.id}`}
        data-personfield='pdiff'
        type='text'
        value={`${p.pdiff}`}
        onChange={handleChange}
      />
      <Plabel htmlFor={`${p.id}-seed`}>Seed</Plabel>{" "}
      <Pinput
        id={`${p.id}-seed`}
        data-personid={`${p.id}`}
        data-personfield='seed'
        type='text'
        value={s}
        onChange={handleChange}
      />
      <Plabel htmlFor={`${p.id}-id`}>id</Plabel>{" "}
      <Pinput
        id={`${p.id}-id`}
        data-personid={`${p.id}`}
        data-personfield='id'
        type='text'
        disabled
        defaultValue={`${p.id}`}
        onBlur={handleChange}
      />
      <button
        onClick={handleChange}
        data-personid={`${p.id}`}
        data-personfield='delete'
        className='bg-orange-100 p-1 rounded-md ml-1 w-24'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4  inline-block'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
          />
        </svg>

        <span
          onClick={handleChange}
          data-personid={`${p.id}`}
          data-personfield='delete'
          className='text-sm pl-1'
        >
          Delete
        </span>
      </button>
    </form>
  );
};

const Players = ({ screen }) => {
  console.log("Screen top of Players...", screen);
  const [data, setData] = useState(initialdata);
  const [dataArray, setDataArray] = useState([]);
  const [ready, setReady] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const addNewPlayer = () => {
    var dArray = [];
    var newPlayers = {};
    if (Object.keys(data.players).length > 0) {
      for (var key in data.players) {
        dArray.push(data.players[key]);
      }
      const sortedArray = dArray.sort(function (a, b) {
        return a.name === b.id ? 0 : a.id < b.id ? 1 : -1;
      });
      const maxId = sortedArray[0].id;
      const maxNum = parseInt(maxId.substring(1, 3));
      const newId = maxNum < 10 ? `p0${maxNum + 1}` : `p${maxNum + 1}`;

      newPlayers = data.players;
      newPlayers[newId] = {
        id: `${newId}`,
        name: "",
        wins: 0,
        losses: 0,
        pdiff: 0,
        seed: 0,
      };
    } else {
      newPlayers["p01"] = {
        id: "p01",
        name: "",
        wins: 0,
        losses: 0,
        pdiff: 0,
        seed: 0,
      };
    }

    var newData = data;
    newData.players = newPlayers;
    setData(newData);
    sortAndSetData();
  };

  const sortAndSetData = () => {
    var dArray = [];
    for (var key in data.players) {
      dArray.push(data.players[key]);
    }

    const newArray = dArray.sort(function (a, b) {
      if (sortDirection === "asc") {
        if (sortBy === "name" || sortBy === "id") {
          return a[sortBy] === b[sortBy] ? 0 : a[sortBy] < b[sortBy] ? -1 : 1;
        } else {
          return parseInt(a[sortBy]) === parseInt(b[sortBy])
            ? 0
            : parseInt(a[sortBy]) < parseInt(b[sortBy])
            ? -1
            : 1;
        }
      } else {
        if (sortBy === "name" || sortBy === "id") {
          return a[sortBy] === b[sortBy] ? 0 : a[sortBy] > b[sortBy] ? -1 : 1;
        } else {
          return parseInt(a[sortBy]) === parseInt(b[sortBy])
            ? 0
            : parseInt(a[sortBy]) > parseInt(b[sortBy])
            ? -1
            : 1;
        }
      }
    });

    setDataArray([...newArray]);
  };

  const seedCompare = (a, b) => {
    if (a.wins > b.wins) {
      return -1;
    }
    if (a.wins < b.wins) {
      return 1;
    }
    if (a.losses < b.losses) {
      return -1;
    }
    if (a.losses > b.losses) {
      return 1;
    }
    if (a.pdiff > b.pdiff) {
      return -1;
    }
    if (a.pdiff < b.pdiff) {
      return 1;
    }
    if (!a.wins && !a.losses) {
      return -1;
    }
    return 0;
  };

  const seedPlayers = () => {
    var newArray = dataArray.sort(seedCompare);
    for (var i = 0; i < newArray.length; i++) {
      newArray[i].seed = i + 1;
      console.log(
        `seed: ${newArray[i].seed} name: ${newArray[i].name} wins: ${newArray[i].wins} Losses: ${newArray[i].losses} pdiff: ${newArray[i].pdiff}`
      );
    }
    setDataArray([...dataArray, newArray]);
    console.log("dataArray after seeding...", dataArray);
  };

  const handleChange = (e) => {
    var newData = data;
    if (e.nativeEvent.target.dataset.personfield === "delete") {
      delete newData.players[e.nativeEvent.target.dataset.personid];
    } else {
      newData.players[e.nativeEvent.target.dataset.personid][
        e.nativeEvent.target.dataset.personfield
      ] = e.nativeEvent.target.value;
    }
    setData({ ...data, newData });
    seedPlayers();
    sortAndSetData();
  };

  const headerSort = async (e) => {
    if (sortBy === e.nativeEvent.target.dataset.sortheader) {
      sortDirection === "asc"
        ? await setSortDirection("desc")
        : await setSortDirection("asc");
    } else {
      await setSortDirection("asc");
      await setSortBy(e.nativeEvent.target.dataset.sortheader);
    }
    await sortAndSetData();
  };

  useEffect(() => {
    sortAndSetData();
    dataArray.map((e, i) => {
      console.log(`e of ${i} in useEffect`, e);
    });
    setReady(true);
  }, []);

  return (
    <>
      <Container>
        <Menu screen={screen} />
        <PlayerHeader
          addNewPlayer={() => addNewPlayer()}
          headerSort={headerSort}
          generateMatches={generateMatches}
          dataArray={dataArray}
        />
        {dataArray.map((e, i) => (
          <div className='' key={`${e.id}`}>
            <hr />
            <OnePlayer
              p={e}
              w={e.wins}
              l={e.losses}
              d={e.pdiff}
              s={e.seed}
              handleChange={handleChange}
            />
          </div>
        ))}

        <span>Hello there!</span>
      </Container>
    </>
  );
};

export default Players;
