// items : [] can be cahnge into direct data
//and directly can be matched through id 1 and 2.
//Also, type of the data already is set.

/*
const wsData = [
    {
        id: 1,
        type: 'category',
        title: 'cooking workshop',
        items : [
            {
                id: 11,
                type: 'item',
                title: 'meat cooking workshop'
            },
            {
                id: 12,
                type: 'item',
                title: 'sushi workshop'
            },
            {
                id: 13,
                type: 'item',
                title: 'italian pasta workshop'
            }
        ]
    },
    {
        id: 2,
        type: 'category',
        title: 'pastry workshop',
        items : [
            {
                id: 21,
                type: 'item',
                title: 'birthday cake workshop'
            },
            {
                id: 22,
                type: 'item',
                title: 'cupcake workshop'
            }
        ]
    }
];
*/

const wsData = [
    {
        id: 1,
        type: 'cate-cooking',
        title: 'cooking workshops',
        number: 10,
        items: []
    },
    {
        id: 2,
        type: 'cate-pastry',
        title: 'pastry workshops',
        number: 5,
        items: []
    },
    {
        id: 3,
        type: 'item-cooking',
        title: 'meat cooking workshop',
        number: 3
    },
    {
        id: 4,
        type: 'item-cooking',
        title: 'sushi workshop',
        number: 3
    },
    {
        id: 5,
        type: 'item-cooking',
        title: 'italian pasta workshop',
        number: 4
    },
    {
        id: 6,
        type: 'item-pastry',
        title: 'birthday cake workshop',
        number: 3
    },
    {
        id: 7,
        type: 'item-pastry',
        title: 'cupcake workshop',
        number: 2
    },
    {
        id: 8,
        type: 'cate-boutiquePastry',
        title: 'boutique pastry workshops',
        number: 0,
        items: []
    }
];
export default wsData;