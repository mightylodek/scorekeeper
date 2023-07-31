import React from "react";
import { Menu } from "../menu";

const handleSubmit = (e) => {
  e.preventDefault();
  const eventName = e.nativeEvent.target[0].value;
  const nameList = e.nativeEvent.target[1].value;
  const nameArray = nameList.split("\n");

  console.log("handleSubmit...", e);
  console.log("target0 value", e.nativeEvent.target[0].value);
  console.log("target1 value", e.nativeEvent.target[1].value);
  console.log("eventName... ", eventName);
  console.log("name Array...", nameArray);
};

const handleFinalsChange = (e) => {
  e.preventDefault();
  const description =
    e.nativeEvent.target.options[e.nativeEvent.target.selectedIndex].dataset
      .description;
  document.getElementById("finaldesc").innerText =
    description === undefined ? " " : description;
};

const handlePrelimsChange = (e) => {
  e.preventDefault();
  const description =
    e.nativeEvent.target.options[e.nativeEvent.target.selectedIndex].dataset
      .description;
  document.getElementById("prelimdesc").innerText =
    description === undefined ? " " : description;
};

const QuickCreate = () => {
  return (
    <div className='mt-4 grid grid-cols-1 place-content-center'>
      <Menu />
      <div className='place-self-center'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='flex flex-col columns-2  mx-4 mb-2'>
            <label
              htmlFor='eventName'
              className=' block text-lg font-medium leading-6 text-gray-900'
            >
              Enter an event name
            </label>

            <input
              type='text'
              name='eventName'
              id='eventName'
              className='mb-1 max-w-sm min-w-0 rounded-md border-0 bg-slate-200 flex-auto  bg-white/5 px-3.5 py-2 ring-transparent sm:text-sm sm:leading-6 focus:ring-transparent'
              placeholder='Event Name'
            />
          </div>
          <div className='flex flex-col columns-2 mx-4 mb-2'>
            <label
              htmlFor='entrylist'
              className=' block text-lg font-medium leading-6 text-gray-900'
            >
              Enter participants (one per line...)
            </label>

            <textarea
              type='text'
              name='entrylist'
              id='entrylist'
              className='mb-1 max-w-sm border-0 rounded-md min-w-0 h-80 flex-auto  bg-slate-200 bg-white/5 px-3.5 py-2 ring-transparent sm:text-sm sm:leading-6 focus:ring-transparent'
              placeholder='Participants'
            />
          </div>
          <div className='flex flex-col columns-2  mx-4 mb-2'>
            <label
              htmlFor='prelimtype'
              className=' block text-lg font-medium leading-6 text-gray-900'
            >
              {" "}
              Type of prelim
            </label>
            <div className='max-w-sm flex flex-row'>
              <select
                id='prelimtype'
                name='prelimtype'
                className='inline-block mb-1 max-w-sm min-w-0 rounded-l-md border-0 bg-slate-200 flex-auto  bg-white/5 px-3.5 py-2 ring-transparent sm:text-sm sm:leading-6 focus:ring-transparent'
                onChange={(e) => handlePrelimsChange(e)}
              >
                <option>No Prelim</option>
                <option data-description='Participants entered are individual people.  Two-person teams will be randomly generated for each round of matches and individual stats will be recorded for seeding.'>
                  Kings Cup
                </option>
                <option data-description='Participants entered are team names.  Matches will be randomly created.'>
                  Random prelim matches
                </option>
                <option data-description='Participants entered are team names.  Each team will be placed within a "pool" and will play a round robin within that pool and team stats will be recorded for seeding'>
                  Round Robin Pool Play
                </option>
              </select>
              <select
                id='matches'
                name='matches'
                className='inline-block mb-1 rounded-r-md border-0 bg-slate-200 flex flex-row  bg-white/5 px-4.5 py-2 ring-transparent sm:text-sm sm:leading-6 focus:ring-transparent'
              >
                <option value='4'>4 Matches</option>
                <option value='3'>3 Matches</option>
                <option value='2'>2 Matches</option>
                <option value='0'> --------- </option>
              </select>
            </div>
            <div className='max-w-sm mb-4'>
              <p id='prelimdesc' className='px-3'></p>
            </div>
          </div>
          <div>
            <div className='flex flex-col columns-2  mx-4 mb-2'>
              <label
                htmlFor='finaltype'
                className=' block text-lg font-medium leading-6 text-gray-900'
              >
                {" "}
                Type of finals
              </label>
              <div className='flex flex-row'>
                <select
                  id='finaltype'
                  defaultValue='seeded'
                  className='inline-block mb-1 max-w-sm min-w-0 rounded-l-md border-0 bg-slate-200 flex-auto  bg-white/5 px-3.5 py-2 ring-transparent sm:text-sm sm:leading-6 focus:ring-transparent'
                  onChange={(e) => handleFinalsChange(e)}
                >
                  <option
                    data-description='No finals.  Results are based only on prelim wins losses and point differencial'
                    value='none'
                  >
                    No Final
                  </option>
                  <option
                    data-description='Seeding is based on wins, losses, and point differential performance in the prelim round.'
                    value='seeded'
                  >
                    Seeded Based On Prelim Results
                  </option>
                  <option
                    data-description='Higher seeded players choose their partner until all team seed slots are filled.  Top 4 cannot choose one another.'
                    value='kingsbracket'
                  >
                    Kings Cup Bracket
                  </option>
                  <option
                    data-description='Teams are randomly placed into bracket slots.'
                    value='random'
                  >
                    Unseeded (Random)
                  </option>
                </select>
                <select
                  id='seeds'
                  name='seeds'
                  className='inline-block mb-1 rounded-r-md border-0 bg-slate-200 flex flex-row  bg-white/5 px-4.5 py-2 ring-transparent sm:text-sm sm:leading-6 focus:ring-transparent'
                >
                  <option value='4'>4 Seeds</option>
                  <option value='8'>8 Seeds</option>
                  <option value='16'>16 Seeds</option>
                  <option value='32'>32 Seeds</option>
                  <option value='0'> --------- </option>
                </select>
              </div>
            </div>
            <div className='max-w-sm ml-4'>
              <p id='finaldesc' className='px-2'></p>
            </div>

            <div className='flex flex-col columns-2 mx-4 mb-2 mt-6'>
              <button className='bg-sky-400 rounded-md h-14'>
                Create event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickCreate;
