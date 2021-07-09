import './Create.css';
import Row from './Row';
import { useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { CgCalendarDates } from 'react-icons/cg';
import DateSelector from './DateSelector';
import { dateArraySort } from '../../Utils';

function Table({ wsData, addRow, deleteRow, datesAll, setDatesAll, saveDatas }) {
  // Product properties
  const [typeCheck, setTypeCheck] = useState(false);
  const [title, setTitle] = useState('');
  const [typeName, setTypeName] = useState('');
  const [amount, setAmount] = useState(0);    // take this as integer - item
  const [price, setPrice] = useState(0);      // take this as integer - item
  const [dates, setDates] = useState([]);     // from AppointmentBox

  const [chooseDate, setChooseDate] = useState(false);

  const changeAndResetData = (dates) => {
    if (dates.length !== 0) {
      const oldArr = [...datesAll];
      dates.map((date) => {
        return oldArr.push(date)
      });
      const newArr = dateArraySort(oldArr);
      setDates([]);
      setDatesAll(newArr);
    }
  }

  return (
    <div className="container-table">

      <div className="table">
        <div className="row header">
          <div className="cell">
            Type
          </div>
          <div className="cell">
            Title
          </div>
          <div className="cell">
            Type Name
          </div>
          <div className="cell">
            Amount
          </div>
          <div className="cell">
            Price
          </div>
          <div className="cell">
            Dates
          </div>
        </div>

        <div className="row">
          <div className="cell" data-title="Type">
            <div className="type-box">
              <input type="checkbox" className="larger"
                onClick={function (event) {
                  setTypeCheck(!typeCheck);
                  setChooseDate(!chooseDate)
                }}
              />
              <span className="type-box-text">
                Check it if you want to add a category as a row.
              </span>
            </div>
          </div>
          <div className="cell" data-title="Title">
            <input type="text" className="text-b"
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className="cell" data-title="Type Name">
            <div className="type-box">
              <input type="text" className="text-b"
                onChange={event => setTypeName(event.target.value)}
              />
              <span className="type-box-text">
                Type name should be the same between category and its items.
                ex: cate-cooking, item-cooking, item-cooking...
              </span>
            </div>
          </div>
          <div className="cell" data-title="Amount">
            {
              typeCheck ?
                <input type="number" className="text-b" disabled /> :
                <input type="number" className="text-b"
                  onChange={event => setAmount(parseInt(event.target.value))}
                />
            }
          </div>
          <div className="cell" data-title="Price">
            {
              typeCheck ?
                <input type="number" className="text-b" disabled /> :
                <input type="number" className="text-b"
                  onChange={event => setPrice(parseInt(event.target.value))}
                />
            }
          </div>
          <div className="cell" data-title="Dates">
            {
              typeCheck ?
                <button className="add-del-btn" disabled>
                  <CgCalendarDates />
                </button> :
                <button className="add-del-btn" onClick={() => setChooseDate(!chooseDate)}>
                  <CgCalendarDates />
                </button>
            }
            {
              typeCheck ?
                null :
                chooseDate ?
                  <DateSelector dates={dates} setDates={setDates} datesAll={datesAll} /> :
                  null
            }
          </div>
          <div className="cell" data-title="Empty">
            <div className="type-box">
              <button className="add-del-btn" onClick={function (event) {
                addRow(typeCheck, title, typeName, amount, price, dates);
                changeAndResetData(dates)
              }}>
                <AiOutlineAppstoreAdd />
              </button>
              <span className="type-box-text">
                Add to row
              </span>
            </div>
          </div>
        </div>
        {
          wsData.map((data) => {
            return <Row key={data.id} data={data} deleteRow={deleteRow} />
          })
        }
      </div>
      <button className="table-btn" onClick={saveDatas}>
        Save Data
      </button>
    </div>
  );
}

export default Table;