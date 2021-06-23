import './Create.css';
import Row from './Row';
import { useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

function Table({ wsData, addRow, deleteRow }) {
    // Product properties
    const [typeCheck, setTypeCheck] = useState(false);
    const [title, setTitle] = useState('');
    const [typeName, setTypeName] = useState('');
    const [amount, setAmount] = useState(0); // take this as integer
    const [price, setPrice] = useState(0);     // take this as integer


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
                            <div className="type-box">
                                <input type="text" className="text-b"
                                    onChange={event => setTypeName(event.target.value)}
                                />
                                <span className="type-box-text">
                                    Type name should be the same between category and its items.
                                    ex: cate-cooking, item-cooking, item-cooking...
                                </span>
                            </div>
                        </td>
                        <td>
                            {
                                typeCheck ?
                                    <input type="number" className="text-b" disabled /> :
                                    <input type="number" className="text-b"
                                        onChange={event => setAmount(parseInt(event.target.value))}
                                    />
                            }
                        </td>
                        <td>
                            {
                                typeCheck ?
                                    <input type="number" className="text-b" disabled /> :
                                    <input type="number" className="text-b"
                                        onChange={event => setPrice(parseInt(event.target.value))}
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
                {
                    wsData.map((data) => {
                        return <Row key={data.id} data={data} deleteRow={deleteRow} />
                    })
                }
            </table>
        </div>
    );
}

export default Table;