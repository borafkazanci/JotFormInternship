import './Create.css';
import { AiFillDelete } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';

function Row({ data, deleteRow }) {
  const { type: typeCheck, title: titleCheck, number: numberCheck, price: priceCheck, dates: datesArr } = data;

  return (
      <div className="row">
        <div className="cell" data-title="Type">
          {
            typeCheck !== '' ?
              typeCheck.substring(0, 4) :
              null
          }
        </div>
        <div className="cell" data-title="Title">
          {
            titleCheck
          }
        </div>
        <div className="cell" data-title="Type Name">
          {
            typeCheck !== '' ?
              typeCheck.substring(5) :
              null
          }
        </div>
        <div className="cell" data-title="Amount">
          {
            typeCheck !== '' ?
              (typeCheck.substring(0, 4) === 'cate' ?
                null :
                numberCheck) :
              null
          }
        </div>
        <div className="cell" data-title="Price">
          {
            typeCheck !== '' ?
              (typeCheck.substring(0, 4) === 'cate' ?
                null :
                <p>${priceCheck}</p>) :
              null
          }
        </div>
        <div className="cell" data-title="Dates">
          {
            typeCheck !== '' ?
              (typeCheck.substring(0, 4) === 'cate' ?
                null :
                <div className="type-box">
                  <BiShow className="show-dates-btn" />
                  <span className="type-box-text-long">
                    {
                      datesArr.map((data) => { // data = datesObject: {date, amount}
                        return (
                          <h5 key={data?.date.day + data?.date.number} >
                            Day:{data?.date.day} - Number:{data?.date.number}
                          </h5>
                        );
                      })
                    }
                  </span>
                </div>
              ) :
              null
          }
        </div>
        <div className="cell" data-title="Empty">
          <div className="type-box">
            <button className="add-del-btn" onClick={() => deleteRow(data)}>
              <AiFillDelete />
            </button>
            <span className="type-box-text">
              Delete row
            </span>
          </div>
        </div>
      </div>
  );
}

export default Row;