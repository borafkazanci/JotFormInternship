import './Create.css';
import Table from './Table';
import { useEffect, useState } from 'react';

function CreateEventBox() {
    const [wsData, setWSData] = useState([]);
    const [countID, setCountID] = useState(1);

    useEffect(() => {
        
    }, [countID, wsData])

    const itemNumberAdder = (cData) => {
        let totalAmount = 0;

        const newTypeArr = wsData.filter((iData) => (iData.type).substring(5) === (cData.type).substring(5));
        const newItemArr = newTypeArr.filter((iData) => (iData.type).substring(0, 4) !== (cData.type).substring(0, 4));

        newItemArr.forEach((data, index) => {
            cData.items[index] = data;
            totalAmount += data.number;
        });
        return totalAmount;
    };

    const categoryItemSetter = (data) => {
        const newData = data;
        newData.number = itemNumberAdder(newData);
        return newData;
    };

    const saveDatas = () => {
        if (wsData !== []) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('Are you sure?')) {
                const cDataArr = wsData.filter((data) => (data.type).substring(0, 4) === 'cate');
                const newArr = [];

                if (cDataArr !== []) {
                    cDataArr.map((data) => {
                        return newArr.push(
                            categoryItemSetter(data)
                        );
                    });
                    newArr.sort((a, b) => a.id - b.id);
                    localStorage.setItem('wsData', JSON.stringify(newArr));
                    alert('Data saved in local storage!');
                }
                else {
                    alert('You need to create a category for items to be shown!')
                }
            }
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
        if (typeCheck) {             // category
            if (title === '' || typeName === '') {
                alert('Please fill text boxes before add new row!');
            }
            else {
                const type = 'cate-' + typeName;

                const categoryObject = {
                    id: countID,
                    type: type,
                    title: title,
                    number: 0,
                    items: []
                };

                const newArr = [...wsData];
                newArr.push(categoryObject);

                setWSData(newArr);
                setCountID(countID + 1);
            }
        }
        else {                       // item
            if (title === '' || typeName === '' || amount === 0 || price === 0) {
                alert('Please fill text boxes before add new row!');
            }
            else {
                if (amount < 0 || price < 0 || Number.isNaN(amount) || Number.isNaN(price)) {
                    alert('Please enter a positive integer!');
                }
                else {
                    const type = 'item-' + typeName;

                    const itemObject = {
                        id: countID,
                        type: type,
                        title: title,
                        number: amount,
                        price: price
                    };

                    const newArr = [...wsData];
                    newArr.push(itemObject);

                    setWSData(newArr);
                    setCountID(countID + 1);
                }
            }
        }
    };

    const deleteRow = (data) => {
        const newArr = wsData.filter((iData) => iData.id !== data.id);
        setWSData(newArr);
        alert(data.id + ': ' + data.title + ' row deleted!')
    };

    return (
        <div>
            <h2>Enter Your Inventory to Table</h2>
            <button className="table-btn" onClick={saveDatas}>
                Save Datas
            </button>
            <Table wsData={wsData} addRow={addRow} deleteRow={deleteRow} />
        </div>
    );
}

export default CreateEventBox;