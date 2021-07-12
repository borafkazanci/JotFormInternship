import EventBox from './EventBox/EventBox';
import CreateEventBox from './CreateEventBox/CreateEventBox';
import './CreateEventBox/Create.css'
import { useState } from 'react';

function TicketSelector() {
  const [sell, setSell] = useState(true);

  return (
    <div className="App">
      <button className="table-btn" onClick={function (event) {
        localStorage.clear();
        console.log('Local storage is clear.')
      }}>
        Clear Local Storage
      </button>
      <div>
        <button className="table-btn" onClick={() => setSell(!sell)}>
          Change Mode
        </button>
      </div>
      <div>
        {
          sell ?
            <CreateEventBox /> :
            <EventBox />
        }
      </div>
    </div>
  );
}

export default TicketSelector;