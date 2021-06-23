import { useEffect, useState } from "react";
import { AiFillDelete } from 'react-icons/ai';

function Row({ data, deleteRow }) {
    const [typeCheck, setTypeCheck] = useState('');
    const [titleCheck, setTitleCheck] = useState('');
    const [numberCheck, setNumberCheck] = useState(0);
    const [priceCheck, setPriceCheck] = useState(0);

    useEffect(() => {
        if ((data.type).substring(0, 4) === 'cate') {
            const { type, title, number } = data;
            setTypeCheck(type);
            setTitleCheck(title);
            setNumberCheck(number);
        }
        else {
            const { type, title, number, price } = data;
            setTypeCheck(type);
            setTitleCheck(title);
            setNumberCheck(number);
            setPriceCheck(price);
        }
    }, [data]);

    return (
        <tbody>
            <tr>
                <td>
                    {
                        typeCheck !== '' ?
                            typeCheck.substring(0, 4) :
                            console.log()
                    }
                </td>
                <td>
                    {
                        titleCheck
                    }
                </td>
                <td>
                    {
                        typeCheck !== '' ?
                            typeCheck.substring(5) :
                            console.log()
                    }
                </td>
                <td>
                    {
                        typeCheck !== '' ?
                            (typeCheck.substring(0, 4) === 'cate' ?
                                console.log() :
                                numberCheck) :
                            console.log()
                    }
                </td>
                <td>
                    {
                        typeCheck !== '' ?
                            (typeCheck.substring(0, 4) === 'cate' ?
                                console.log() :
                                priceCheck) :
                            console.log()
                    }
                </td>
                <td>
                    <button onClick={() => deleteRow(data)}>
                        <AiFillDelete />
                    </button>
                </td>
            </tr>
        </tbody>
    );
}

export default Row;