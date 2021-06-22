import './BoxItem.css';
import Category from './Category';
import { GiBuyCard } from 'react-icons/gi';
import { useEffect, useState } from 'react';

// item id çekme:
// redux ?
// by exporting useStates?
function BoxItem({ categories, buyCategoryItem }) {
    const [buyCatId, setBuyCatId] = useState(-1);
    const [buyItemId, setBuyItemId] = useState(-1);
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
            </div>
            <div className="amount-select">
                <select name="amount" id="amount" onChange={event => setValueNum(event.target.value)}>
                    {
                        (buyItemId === -1) ?
                            <option value="none">Choose an item</option> :
                            optionList.map((i) => {
                                return (
                                    // not working as I intended
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                );
                            })
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