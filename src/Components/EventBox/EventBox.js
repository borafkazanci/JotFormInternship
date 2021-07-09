import './BoxItem.css';
import BoxItem from "./BoxItem";
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

  const buyCategoryItem = (categoryID, itemID, amount, cAppointment) => {
    if (categoryID > 0) {
      // category setter
      const selectedCategory = { ...categories.find(({ id }) => id === categoryID) };
      const newCategories = categories.filter(({ id }) => id !== categoryID);
      // item setter
      const selectedItem = { ...(selectedCategory.items).find(({ id }) => id === itemID) };
      const newItems = (selectedCategory.items).filter(({ id }) => id !== itemID);
      // appointment setter
      const selectedAppointment = { ...(selectedItem.dates).find((data) => data.date.day + data.date.number === cAppointment) };
      const newAppointments = (selectedItem.dates).filter((data) => data.date.day + data.date.number !== cAppointment);

      if ((selectedCategory.number > 0) && (selectedItem.number > 0)) {
        selectedCategory.number -= amount;
        selectedItem.number -= amount;
        selectedAppointment.amount -= amount;

        if (selectedAppointment.amount !== 0) {
          newAppointments.push(selectedAppointment);
          newAppointments.sort((a, b) =>
            (a.date.day + a.date.number) - (b.date.day + b.date.number));
        }
        selectedItem.dates = newAppointments;

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
        <div className="item-box">
          <h4>can't load the widget</h4>
        </div>
    }
  </div>
}

export default EventBox;