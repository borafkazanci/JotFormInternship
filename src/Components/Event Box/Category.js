import './BoxItem.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useEffect, useState } from 'react';

function Category({ category, setBuyCatId, setBuyItemId }) {
    const { id, title, type, number, items } = category;
    const [showItems, setShowItems] = useState();

    useEffect(() => {
        setShowItems(false);
    }, [])

    const passItself = (itself) => {
        setBuyCatId(category);
        setBuyItemId(itself);
    }

    const itemBox = (
        id,
        title,
        type,
        number,
        items = [],
        itself
    ) => {
        return (
            <article key={id} className="item">
                <div className='item-box-left'>
                    {
                        (type.substring(0, 4) === 'cate') ?
                            <AiOutlineArrowDown className="arrowdown-btn"
                                onClick={() =>
                                    setShowItems(!showItems)
                                } /> :
                            <input type="radio" name="items"
                                onClick={() => passItself(itself)}
                            />
                    }
                    <h4>{title}</h4>
                </div>
                <div className="item-box-right">
                    <h5 className="ava-text">
                        {number} available
                    </h5>
                </div>
                <article>
                    {
                        showItems &&
                        (
                            <div>
                                {
                                    items.map((item) => {
                                        return itemBox(item.id, item.title,
                                            item.type, item.number, [], item);
                                    })
                                }
                            </div>
                        )
                    }
                </article>
            </article>
        );
    };

    return (
        itemBox(id, title, type, number, items, category)
    );
}

export default Category;