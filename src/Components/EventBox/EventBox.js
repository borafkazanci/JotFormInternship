import BoxItem from "./BoxItem";
//import sheetData from "../data";
import { useEffect, useState } from "react";

function EventBox() {
    const [categories, setCategories] = useState([]);

    const [firstRun, setFirstRun] = useState();
    const [isCatChanged, setIsCatChanged] = useState();
    const [isLoad, setIsLoad] = useState();

    const getLocalData = () => {
        const data = JSON.parse(localStorage.getItem('wsData'));

        if (data === null) {
            setIsLoad(false);
        }
        else {
            setIsLoad(true);
            return data;
        }
    };

    useEffect(() => {
        setFirstRun(false);
        setIsCatChanged(false);
    }, []);

    useEffect(() => {
        const data = getLocalData();
        if (!firstRun) {
            setCategories(data);
            setFirstRun(true);
        }
        else if (isCatChanged) {
            localStorage.clear();
            localStorage.setItem('wsData', JSON.stringify(categories));

            setIsCatChanged(false);
        }
    }, [categories, firstRun, isCatChanged]);

    const buyCategoryItem = (categoryID, itemID, amount) => {
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
                setIsCatChanged(true);
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
        {
            isLoad ?
                <BoxItem categories={categories} buyCategoryItem={buyCategoryItem} /> :
                <h4>can't load the page</h4>
        }
    </div>
}

export default EventBox;