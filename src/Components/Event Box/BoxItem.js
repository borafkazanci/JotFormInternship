import './BoxItem.css';
import Category from './Category';
import { ImPacman } from 'react-icons/im';
import { useEffect, useState } from 'react';

// item id çekme:
// redux ?
// by exporting useStates?
function BoxItem({ categories }) {
    const [buyCatId, setBuyCatId] = useState(-1);
    const [buyItemId, setBuyItemId] = useState(-1);

    useEffect(() => {
        console.log(buyCatId);
        console.log(buyItemId);
    }, [buyCatId, buyItemId])

    const buyWorkshop = () => {
        // every click or changes on numbers,
        // refresh the components
        if (buyCatId !== -1) {
            if ((buyCatId.number > 0) && (buyItemId.number > 0)) {
                //setBuyCatId({...buyCatId, number: buyCatId.number - 1});
                //setBuyItemId({...buyItemId, number: buyItemId.number - 1});

                buyCatId.number--; // i can add item number to
                setBuyCatId({...buyCatId});
                buyItemId.number--; //      get category number
                setBuyItemId({...buyItemId});
            }
            else{
                alert('Stock is out!');
            }
        }
        else {
            alert('Choose an item from list!');
        }
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
            <div className="buy-btn">
                <ImPacman onClick={buyWorkshop} />
            </div>
        </div>
    );
}

export default BoxItem;