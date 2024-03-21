import { Table } from 'antd';
import useComponentContext from '../context/component-context';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount
  },
]

export default function AssetsTable() {
    const { assets } = useComponentContext()

    const data = assets.map(asset => ({
        key: asset.id,
        name: asset.name,
        price: asset.price,
        amount: asset.amount
    }))

    return (
      <div style={{
        position: 'absolute',
        bottom: 30.5,
        right: 30,
        left: 370
      }}>
        <Table pagination={false} columns={columns} dataSource={data}/>
      </div>
      
    )
}