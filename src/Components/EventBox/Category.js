import './BoxItem.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useEffect,  useState } from 'react';

function Category({ category, setBuyCatId, setBuyItemId }) {
  const { id, title, type, number, items } = category;
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    setBuyCatId(false);
    setBuyItemId(false);
  }, [setBuyCatId, setBuyItemId, showItems]);

  const itemBox = (
    id,
    title,
    type,
    number,
    items = [],
    itself
  ) => {
    return (
      <article key={id} className={type.substring(0, 4)}>
        <div className='item-box-left'>
          {
            type.substring(0, 4) === 'cate' ?
              <AiOutlineArrowDown className="arrowdown-btn"
                onClick={() =>
                  setShowItems(!showItems)
                } /> :
              <input type="radio" name="items"
                onClick={function (event) {
                  setBuyCatId(category);
                  setBuyItemId(itself)
                }}
              />
          }
          <p className="title">{title}</p>
        </div>
        <div className="item-box-right">
          {
            number === 0 ?
              <p className="not-ava-text">
                total {number} available
              </p> :
              <p className="ava-text">
                total {number} available
              </p>
          }
          {
            type.substring(0, 4) === 'item' ?
              <h5 className="price-text">
                ${itself.price}
              </h5> :
              <h5 className="price-text">

              </h5>
          }
        </div>
        <article>
          {
            showItems &&
            <div>
              {
                items.map((item) => {
                  return itemBox(item.id, item.title,
                    item.type, item.number, [], item);
                })
              }
            </div>
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