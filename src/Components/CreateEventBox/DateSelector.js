import './Create.css';
import { useEffect, useState } from 'react';
import AppointmentBox from '../AppointmentBox';
import { getDateStringFromStartDate, organizeAppointmentBoxDates } from '../../Utils';
import { BiShow } from 'react-icons/bi';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addMonths from "date-fns/addMonths";

function DateSelector({ dates, setDates, datesAll }) {
  const [startDate, setStartDate] = useState(new Date());
  const [intervalDate, setIntervalDate] = useState('');

  const [currDays, setCurrDays] = useState('');

  useEffect(() => {
    const dateString = getDateStringFromStartDate(startDate);
    setIntervalDate(dateString);

    setCurrDays(organizeAppointmentBoxDates(startDate, datesAll)?.days);
  }, [startDate, datesAll]);

  return (
    <div>
      <div className="datepicker">
        {
          // moment js - lib ??? or on rds jotform datepicker
        }
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          maxDate={addMonths(new Date(), 2)}
          showDisabledMonthNavigation
        />
      </div>
      <div>
        {
          intervalDate ?
            <AppointmentBox
              firstDate={intervalDate}
              dates={dates}
              setDates={setDates}
              currDays={currDays}
            /> :
            null
        }
      </div>
      <div className="type-box">
        <label><BiShow className="show-dates-btn" /></label>
        <span className="type-box-text-long">
          {
            dates.map((data) => {
              return (
                <h5 key={data.day + data.number} >
                  Day:{data.day} - Number:{data.number}
                </h5>
              );
            })
          }
        </span>
      </div>
    </div>
  );
}

export default DateSelector;