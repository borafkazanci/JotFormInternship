import './Create.css';
import Table from './Table';
import { useState } from 'react';

function CreateEventBox() {
    const [wsData, setWSData] = useState([]);

    const saveDatas = (iData) => {
        if (wsData !== []) {
            localStorage.setItem('wsData', JSON.stringify(iData));
        }
        else {
            alert('Data is not entered!');
        }
    };

    const addRow = (
        typeCheck,
        title,
        typeName,
        amount,
        price,
    ) => {
        console.log("object");

        if (typeCheck) {             // category
            if (title === '' || typeName === '') {
                alert('Please fill text boxes before add new row!');
            }
            else {

            }
        }
        else {                       // item
            if (title === '' || typeName === '' || amount === '' || price === '') {
                alert('Please fill text boxes before add new row!');
            }
            else {

            }
        }
    };

    return (
        <div>
            <h2>Simple Inventory Table</h2>
            <button className="table-btn" onClick={() => saveDatas(wsData)}>
                Save Datas
            </button>
            <Table setWSData={setWSData} addRow={addRow} />
        </div>
    );
}

export default CreateEventBox;