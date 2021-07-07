import './Create.css';
import Table from './Table';
import { useEffect, useState } from 'react';

function CreateEventBox() {
  const [wsData, setWSData] = useState([]);
  const [countID, setCountID] = useState(1);
  const [datesAll, setDatesAll] = useState([]);

  useEffect(() => {

  }, [wsData])

  const itemNumberAdder = (cData) => {
    let totalAmount = 0;
    const newTypeArr = wsData.filter((iData) => (iData.type).substring(5) === (cData.type).substring(5));
    const newItemArr = newTypeArr.filter((iData) => (iData.type).substring(0, 4) !== (cData.type).substring(0, 4)); //items in cat

    newItemArr.forEach((data, index) => {
      cData.items[index] = data;

      data.number += data.dates[0].amount * data.dates.length;
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
          localStorage.setItem('wsData', JSON.stringify(newArr)); // redux?
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
    dates
  ) => {
    let object;
    if (typeCheck) {             // category
      if (title === '' || typeName === '') {
        alert('Please fill text boxes before add new row!');
      }
      else {
        const type = 'cate-' + typeName;

        object = {
          id: countID,
          type: type,
          title: title,
          number: 0,
          items: []
        };

        const newArr = [...wsData];
        newArr.push(object);
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

          object = {
            id: countID,
            type: type,
            title: title,
            number: 0,
            price: price,
            dates: []
          };

          dates.forEach((data) => {
            const datesObject = {
              date: data,
              amount: amount
            }
            object.dates.push(datesObject);
          })

          if (object.dates.length !== 0) {
            const newArr = [...wsData];
            newArr.push(object);
            setWSData(newArr);
            setCountID(countID + 1);
            console.log(wsData);
          }
          else {
            alert('Please select appointments before add new row!');
          }
        }
      }
    }
  };

  const deleteRow = (data) => {
    const newArr = wsData.filter((iData) => iData.id !== data.id);
    setWSData(newArr);
    alert(data.id + ': ' + data.title + ' row deleted!');

    if (data.type.substring(0, 4) === 'item') {
      const compareArr = { ...wsData.find((iData) => iData.id === data.id) };
      let tempDatesAll = [...datesAll];
      let newDateArr = [];

      compareArr.dates.forEach((data) => {
        newDateArr = tempDatesAll.filter((eData) =>
          data.date.day + data.date.number !== eData.day + eData.number
        );
        tempDatesAll = [...newDateArr];
      })
      setDatesAll(newDateArr);
    }
  };

  return (
    <div>
      <h2>Enter Your Inventory to Table</h2>
      <button className="table-btn" onClick={saveDatas}>
        Save Datas
      </button>
      <Table
        wsData={wsData}
        addRow={addRow}
        deleteRow={deleteRow}
        datesAll={datesAll}
        setDatesAll={setDatesAll}
      />
    </div>
  );
}

export default CreateEventBox;