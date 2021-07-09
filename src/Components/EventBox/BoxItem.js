import './BoxItem.css';
import Category from './Category';
import { GiBuyCard } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import AppointmentBox from '../AppointmentBox';
import { getDateStringFromStartDate, organizeAppointmentBoxDates } from '../../Utils';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addMonths from "date-fns/addMonths";

function BoxItem({ categories, buyCategoryItem }) {
  // Ellement selection
  const [buyCatId, setBuyCatId] = useState(false);
  const [buyItemId, setBuyItemId] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(false);

  const [optionList, setOptionList] = useState();
  const [valueNum, setValueNum] = useState();

  // Appointment Picker
  const [startDate, setStartDate] = useState(new Date());
  const [intervalDate, setIntervalDate] = useState('');
  const [currDays, setCurrDays] = useState('');

  useEffect(() => {
    const dateString = getDateStringFromStartDate(startDate);
    setIntervalDate(dateString);

    setCurrDays(organizeAppointmentBoxDates(startDate, buyItemId.dates, 'user')?.days);
  }, [startDate, buyItemId]);

  useEffect(() => {
    const newArr = [0];
    const currAppointment = {
      ...(buyItemId.dates)?.find((data) =>
        data.date.day + data.date.number === selectedAppointment)
    };
    for (var i = 1; i <= currAppointment?.amount; i++) {
      newArr.push(i);
    }
    setOptionList(newArr);
  }, [buyCatId, buyItemId.dates, selectedAppointment]);

  const callAppointmentBox = () => {
    return (
      <AppointmentBox
        firstDate={intervalDate}
        maxResAppointments={1}
        currDays={currDays}
        type={'user'}
        setSelectedAppointment={setSelectedAppointment}
      />
    );
  }

  return (
    <div>
      <div className='item-box'>
        {
          categories.map((category) => {
            return (
              <Category key={category.id}
                category={category}
                setBuyCatId={setBuyCatId}
                setBuyItemId={setBuyItemId}
              />
            );
          })
        }
      </div>
      <div>
        {
          buyCatId ?
            <div className='item-box'>
              <div>
                {
                  buyCatId ?
                    <h3>Now Chosen : {buyItemId.title} from {buyCatId.title}</h3> :
                    null
                }
              </div>
              <div className="datepicker">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 1)}
                  showDisabledMonthNavigation
                />
              </div>
              <div>
                {
                  intervalDate ?
                    callAppointmentBox() :
                    null
                }
              </div>
              <div className="amount-select">
                <select name="amount" id="amount" onChange={event => setValueNum(event.target.value)}>
                  {
                    selectedAppointment ?
                      optionList.map((i) => {
                        return (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        );
                      }) :
                      <option value="none">Choose an date</option>
                  }
                </select>
              </div>
              <div>
                {
                  valueNum && buyCatId ?
                    <h3>Total cost: ${buyItemId.price * valueNum} </h3> :
                    null
                }
              </div>
              <div>
                <button
                  className="buy-btn"
                  onClick={() => buyCategoryItem(buyCatId.id, buyItemId.id, valueNum, selectedAppointment)}>
                  <GiBuyCard /> Buy Tickets
                </button>
              </div>
            </div> :
            null
        }
      </div>
    </div>
  );
}

export default BoxItem;