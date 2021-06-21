import './BoxItem.css';
import Category from './Category';
import { ImPacman } from 'react-icons/im';
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
        console.log(buyCatId);
        console.log(buyItemId);

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
                <select name="amount" id="amount">
                    {
                        (buyItemId === -1) ?
                            <option value="none">Choose an item</option> :
                            optionList.map((i) => {
                                return (
                                    // not working as I intended
                                    <option key={i} value={i} onClick={
                                        event => setValueNum(event.target.value)}>
                                        {i}
                                    </option>
                                );
                            })
                    }
                </select>
            </div>
            <div className="buy-btn">
                <ImPacman onClick={() => buyCategoryItem(buyCatId.id, buyItemId.id, valueNum)} />
            </div>

        </div>
    );
}

export default BoxItem;