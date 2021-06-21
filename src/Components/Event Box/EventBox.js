import BoxItem from "./BoxItem";
import wsData from "../data";
import { useEffect, useState } from "react";

function EventBox() {
    const [categories, setCategory] = useState([]);
    const [items, setItems] = useState([]);

    const initDatas = (type) => {
        const newSets = wsData.filter((wshop) =>
            (wshop.type).substring(0, 4) === type
        );
        (type === 'cate') ?
            setCategory(newSets) :
            setItems(newSets);
    };

    useEffect(() => {
        initDatas('cate');
        initDatas('item');
    }, []);

    useEffect(() => {
        categories.forEach(cat => {
            var count = 0;
            items.forEach(item => {
                if ((cat.type).substring(5) === (item.type).substring(5)) {
                    cat.items[count++] = item;
                }
            });
        });
    }, [categories, items]);

    return <div>
        <BoxItem categories={categories}  />
    </div>
}

export default EventBox;