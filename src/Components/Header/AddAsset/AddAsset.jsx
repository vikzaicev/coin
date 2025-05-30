
import { Button, Form, InputNumber, Select, Space, DatePicker, Result } from 'antd';
import { useContext, useState, useRef } from 'react';
import { CriptoContext } from '../../../Context';
import { CoinInfo } from '../CoinInfo/CoinInfo';

export const AddNewAsset = ({ onClose }) => {
    const [coin, setCoin] = useState(null)
    const { coinData, addAsset } = useContext(CriptoContext);
    const [submitted, setSubmitted] = useState(false)
    const [form] = Form.useForm();
    const assetRef = useRef()

    const validateMessages = {
        required: "'${name}' is required!",
        types: {
            number: "'${name}' is not a valid number!",
        },
        number: {
            range: "'${name}' must be between ${min} and ${max}!",
        },
    };
    const onFinish = values => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        };
        assetRef.current = newAsset;
        addAsset(newAsset);
        setSubmitted(true);
    };

    const handleAmountChange = (value) => {
        const price = form.getFieldValue('price');
        form.setFieldsValue({
            total: +(price * value).toFixed(2)
        });
    }

    const handlePriceChange = (value) => {
        const amount = form.getFieldValue('amount');
        form.setFieldsValue({
            total: +(amount * value).toFixed(2)
        });
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                placeholder="Select a coin"
                onSelect={(v) => setCoin(coinData.find(coin => coin.id === v))}
                options={coinData.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    img: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img src={option.data.img} style={{ width: '25px' }} alt={option.data.id}></img>{'  '}
                        {option.data.label}
                    </Space>
                )}
            />
        )
    }

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
                extra={[
                    <Button onClick={onClose} type="primary" key="console">
                        Close
                    </Button>,
                ]}
            />
        )
    }
    return (
        <>
            <CoinInfo coin={coin} />
            <Form validateMessages={validateMessages}
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ price: coin.price.toFixed(2), total: coin.price }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, type: 'number', min: '0', }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} onChange={handleAmountChange} />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price" >
                    <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Date & Time"
                    name="date" >
                    <DatePicker showTime style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Total"
                    name="total" >
                    <InputNumber disabled style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}