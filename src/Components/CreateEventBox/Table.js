import './Create.css';
import Row from './Row';
import { useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { CgCalendarDates } from 'react-icons/cg';
import DateSelector from './DateSelector';
import { dateArraySort } from '../../Utils';

function Table({ wsData, addRow, deleteRow }) {
    // Product properties
    const [typeCheck, setTypeCheck] = useState(false);
    const [title, setTitle] = useState('');
    const [typeName, setTypeName] = useState('');
    const [amount, setAmount] = useState(0);    // take this as integer - item
    const [price, setPrice] = useState(0);      // take this as integer - item
    const [dates, setDates] = useState([]);     // from AppointmentBox

    const [chooseDate, setChooseDate] = useState(false);
    const [datesAll, setDatesAll] = useState([]);

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
            <table>
                <thead>
                    <tr>
                        <th>Type </th>
                        <th>Title </th>
                        <th>Type Name </th>
                        <th>Amount </th>
                        <th>Price </th>
                        <th>Dates</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            <input type="text" className="text-b"
                                onChange={event => setTitle(event.target.value)}
                            />
                        </td>
                        <td>
                            <div className="type-box">
                                <input type="text" className="text-b"
                                    onChange={event => setTypeName(event.target.value)}
                                />
                                <span className="type-box-text">
                                    Type name should be the same between category and its items.
                                    ex: cate-cooking, item-cooking, item-cooking...
                                </span>
                            </div>
                        </td>
                        <td>
                            {
                                typeCheck ?
                                    <input type="number" className="text-b" disabled /> :
                                    <input type="number" className="text-b"
                                        onChange={event => setAmount(parseInt(event.target.value))}
                                    />
                            }
                        </td>
                        <td>
                            {
                                typeCheck ?
                                    <input type="number" className="text-b" disabled /> :
                                    <input type="number" className="text-b"
                                        onChange={event => setPrice(parseInt(event.target.value))}
                                    />
                            }
                        </td>
                        <td>
                            {
                                typeCheck ?
                                    <button disabled>
                                        <CgCalendarDates />
                                    </button> :
                                    <button onClick={() => setChooseDate(!chooseDate)}>
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
                        </td>
                        <td>
                            <div className="type-box">
                                <button onClick={function (event) {
                                    addRow(typeCheck, title, typeName, amount, price, dates);
                                    changeAndResetData(dates)
                                }}>
                                    <AiOutlineAppstoreAdd />
                                </button>
                                <span className="type-box-text">
                                    Add to row
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
                {
                    wsData.map((data) => {
                        return <Row key={data.id} data={data} deleteRow={deleteRow} />
                    })
                }
            </table>
        </div>
    );
}

export default Table;