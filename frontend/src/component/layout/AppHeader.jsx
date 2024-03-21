import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useState, useEffect } from "react";
import useComponentContext from "../../context/component-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetDrawer from "../AddAssetDrawer";

const headerStyle = {
    textAlign: 'center',
    height: 60,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
};

const AppHeader = () => {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [coin, setCoin] = useState(null)
    const { crypto } = useComponentContext()

    useEffect(() => {
        const pressKey = event => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', pressKey)
        return () => document.removeEventListener('keypress', pressKey)
    }, [])

    function handleSelect(value) {
        setCoin(crypto.find(c => c.id === value))
        setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                width: 250,
                }}
                open={select}
                onClick={() => setSelect((prev) => !prev)}
                onSelect={handleSelect}
                value="press / to open"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
                        {' '}
                        <span>{option.data.label}</span>
                    </Space>
                )}
            />

            <Button type="primary" onClick={() => setDrawer(true)}>
                Add Asset
            </Button>
            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <CoinInfoModal coin={coin} />
            </Modal>
            <Drawer
                title="Add Asset"
                onClose={() => setDrawer(false)}
                open={drawer}
                width={600}
                destroyOnClose
            >
                <AddAssetDrawer onClose={() => setDrawer(false)}/>
            </Drawer>
        </Layout.Header>
    )
}
 
export default AppHeader