import { Table, Tag } from 'antd';
import { useContext } from "react";
import { CriptoContext } from "../../../Context";
import { toUpperCase } from '../../../utils';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.name - b.name,
        render: text => <a>{toUpperCase(text)}</a>,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Persent',
        key: 'tags',
        dataIndex: 'tags',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.tags.persent - b.tags.persent,
        render: (_, { tags, }) => (
            <>
                {tags.map(tag => {
                    let color = tag.grow ? 'green' : 'red';

                    return (
                        <Tag color={color} key={tag}>
                            {tag.persent}%
                        </Tag>
                    );
                })}
            </>
        ),
    },

];

export const AssetTable = () => {
    const { dataAssets } = useContext(CriptoContext);

    const data = dataAssets.map(a => (
        {
            key: a.id,
            name: a.id,
            amount: a.amount,
            price: a.price,
            tags: [{ persent: a.growPersent, grow: a.grow }]
        }
    ))

    return (
        <Table columns={columns} dataSource={data} pagination={false} />
    )
}
