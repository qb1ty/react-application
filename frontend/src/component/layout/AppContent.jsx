import { Layout, Typography } from "antd"; 
import useComponentContext from '../../context/component-context'
import AssetsTable from "../AssetsTable";
import PortfolioCharts from "../PortfolioCharts";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

const AppContent = () => {
    const { assets, crypto } = useComponentContext()
    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})
    const portfolioMoney = assets.map(asset => asset.amount * cryptoPriceMap[asset.id]).reduce((acc, v) => (acc += v), 0).toFixed(2)

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
                Portfolio: {portfolioMoney}$
            </Typography.Title>
            <PortfolioCharts />
            <AssetsTable />
        </Layout.Content>
    )
}
 
export default AppContent;