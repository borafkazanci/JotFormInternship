import BoxItem from "./BoxItem";
import wsData from "../data";
import { useEffect, useState } from "react";

function EventBox() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [firstRun, setFirstRun] = useState();

    const initDatas = (type) => {
        const newSets = wsData.filter((wshop) =>
            (wshop.type).substring(0, 4) === type
        );
        (type === 'cate') ?
            setCategories(newSets) :
            setItems(newSets);
    };

    useEffect(() => {
        initDatas('cate');
        initDatas('item');
        setFirstRun(false);
    }, []);

    useEffect(() => {
        if (firstRun === false) {
            categories.forEach(cat => {
                var count = 0;
                items.forEach(item => {
                    if ((cat.type).substring(5) === (item.type).substring(5)) {
                        cat.items[count++] = item;
                    }
                });
            });
            setFirstRun(true);
        }
    }, [categories, items, firstRun]);

    const buyCategoryItem = (categoryID, itemID, amount) => {
        console.log(amount);
        if (categoryID > 0) {
            const selectedCategory = { ...categories.find(({ id }) => id === categoryID) };
            const newCategories = categories.filter(({ id }) => id !== categoryID);

            const selectedItem = { ...(selectedCategory.items).find(({ id }) => id === itemID) };
            const newItems = (selectedCategory.items).filter(({ id }) => id !== itemID);

            if ((selectedCategory.number > 0) && (selectedItem.number > 0)) {
                selectedCategory.number -= amount;
                selectedItem.number -= amount;

                newItems.push(selectedItem);
                newItems.sort((a, b) => a.id - b.id);
                selectedCategory.items = newItems;

                newCategories.push(selectedCategory);
                newCategories.sort((a, b) => a.id - b.id);

                setCategories(newCategories);
            }
            else {
                alert('Stock is out!');
            }
        }
        else {
            alert('Choose an item from list!');
        }
    };

    return <div>
        <BoxItem categories={categories} buyCategoryItem={buyCategoryItem} />
    </div>
}

export default EventBox;