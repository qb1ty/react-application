import { Select, Space, Divider, Form, InputNumber, Button, DatePicker, Result } from "antd"
import { useState, useRef } from "react"
import useComponentContext from "../context/component-context"
import CoinInfo from "./CoinInfo";

const validateMessages = {
    required: '${name} is required!',
    types: {
        number: '${label} in not valid number!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
};

export default function AddAssetDrawer({ onClose }) {
    const [ form ] = Form.useForm()
    const { crypto, addAsset, assets } = useComponentContext()
    const [coin, setCoin] = useState(null)
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(false)
    const assetRef = useRef()

    if (submit) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}.`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>
                ]}
            />
        )
    }

    if (error) {
        return (
            <Result
                status="error"
                title="Submission Failed"
                subTitle="You already have this cryptocurrency."
                extra={[
                    <Button type="danger" key="console" onClick={onClose}>
                        Close
                    </Button>
                ]}
            ></Result>
        )
    }

    if (!coin) {
        return (
            <Select
                style={{
                    width: '100%',
                }}
                onSelect={value => setCoin(crypto.find(c => c.id === value))}
                placeholder="Select coin"
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
        )
    }

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        const asset = assets.filter(asset => {
            const asset2 = asset.id === coin.id
            return asset2
        }).reduce((acc, v) => {
            if (v.id === coin.id) {
                return acc = true
            } else {
                return acc = false
            }
        }, false)
        assetRef.current = newAsset
        if (asset) {
            setError(true)
        } else {
            setSubmit(true)
            addAsset(newAsset)
        }
        
        console.log(asset)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price > 1 ? +coin.price.toFixed(2) : +coin.price,
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin}/>
            <Divider />

            <Form.Item label="Date & Time" name="date">
                <DatePicker showTime style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item label="Amount" name="amount" rules={[{
                required: true,
                type: 'number',
                min: 0,
            }]}>
                <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item label="Price" name="price">
                <InputNumber onChange={handlePriceChange} style={{width: '100%'}}/>
            </Form.Item>


            <Form.Item label="Total" name="total">
                <InputNumber disabled style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    )
}