import './Create.css';
//import Row from './Row';
import { useEffect, useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

/*
    {
        id: 1,
        type: 'cate-cooking',
        title: 'cooking workshops',
        number: 10,
        items: []
    }
    {
        id: 3,
        type: 'item-cooking',
        title: 'meat cooking workshop',
        number: 3,
        price: 100
    }
*/

function Table({ setWSData, addRow }) {
    // Product properties
    const [typeCheck, setTypeCheck] = useState(false);
    const [title, setTitle] = useState('');
    const [typeName, setTypeName] = useState('');
    const [amount, setAmount] = useState(''); // take this as integer
    const [price, setPrice] = useState('');     // take this as integer

    useEffect(() => {
        console.log(typeCheck, title, typeName, amount, price);
    }, [amount, price, title, typeCheck, typeName]);

    return (
        <div className="container-table">
            <table>
                <thead>
                    <tr>
                        <th>Type </th>
                        <th>Title </th>
                        <th>Type Name </th>
                        <th>Amount </th>
                        <th>Price </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="type-box">
                                <input type="checkbox" className="larger"
                                    onClick={() => setTypeCheck(!typeCheck)}
                                />
                                <span className="type-box-text">
                                    Check it if you want to add a category as a row.
                                </span>
                            </div>
                        </td>
                        <td>
                            <input type="text" className="text-b"
                                onChange={event => setTitle(event.target.value)}
                            />
                        </td>
                        <td>
                            <input type="text" className="text-b"
                                onChange={event => setTypeName(event.target.value)}
                            />
                        </td>
                        <td>
                            {
                                typeCheck ?
                                    <input type="text" className="text-b" disabled /> :
                                    <input type="text" className="text-b"
                                        onChange={event => setAmount(event.target.value)}
                                    />
                            }
                        </td>
                        <td>
                            {
                                typeCheck ?
                                    <input type="text" className="text-b" disabled /> :
                                    <input type="text" className="text-b"
                                        onChange={event => setPrice(event.target.value)}
                                    />
                            }
                        </td>
                        <td>
                            <button onClick={() => addRow(typeCheck, title, typeName, amount, price)}>
                                <AiOutlineAppstoreAdd />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;