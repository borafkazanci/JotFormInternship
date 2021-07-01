import './BoxItem.css';
import Category from './Category';
import { GiBuyCard } from 'react-icons/gi';
import { useEffect, useState } from 'react';
//import AppointmentBox from '../AppointmentBox';

function BoxItem({ categories, buyCategoryItem }) {
    const [buyCatId, setBuyCatId] = useState(false);
    const [buyItemId, setBuyItemId] = useState(false);

    const [optionList, setOptionList] = useState();
    const [valueNum, setValueNum] = useState();

    useEffect(() => {
        const newArr = [0];
        for (var i = 1; i <= buyItemId.number; i++) {
            newArr.push(i);
        }
        setOptionList(newArr);
    }, [buyCatId, buyItemId]);

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
                {
                    //<AppointmentBox />
                    // date picker -> one day appointment box
                    // date picker shows available days for that chosen event -> appointment box show hours that is available

                    // prepare: set local data at inventory table per month to ease ui/ux at creating forms
                }
            </div>
            <div className="amount-select">
                {
                    buyCatId ?
                        <h3><p>Now Chosen :</p> {buyItemId.title} from {buyCatId.title}</h3> :
                        null
                }
                <select name="amount" id="amount" onChange={event => setValueNum(event.target.value)}>
                    {
                        buyItemId ?
                            optionList.map((i) => {
                                return (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                );
                            }) :
                            <option value="none">Choose an item</option>
                    }
                </select>
            </div>
            <div className="buy-btn">
                <button onClick={() => buyCategoryItem(buyCatId.id, buyItemId.id, valueNum)}>
                    <GiBuyCard /> Buy Tickets
                </button>
            </div>
        </div>
    );
}

export default BoxItem;