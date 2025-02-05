import React from 'react';
import { Card, Space } from 'antd';

export default function CardComponent({currency} : any) {
    const price = currency.quote.USD.price;
    const percent_change = currency.quote.USD.percent_change_24h;
    const price_change = currency.quote.USD.volume_change_24h;
    return (
    <Space direction="vertical" size={16}>
        <Card
            title={
                <div className='flex items-center gap-3 h-16'>
                    <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}/>
                    <span>{currency.name}</span>
                </div>
            }
            style={{width: 500, height: 200, boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'}}
        >
            <div className='text-xl'>
                <b><p>Стоимость: {price >= 1 ? Math.round(price) : price}$</p></b>
                <b><p className='flex'>Процентное изменение за 24ч:  {
                    percent_change > 0 ? <p className='text-green-500'> {percent_change}%</p> :
                        <p className='text-red-500'> {percent_change}%</p>
                }</p></b>
                <b><p className='flex'>Изменение цены за 24ч: {
                    price_change > 0 ? <p className='text-green-500'> {price_change}$</p> :
                        <p className='text-red-500'> {price_change}$</p>
                }</p></b>
            </div>
        </Card>
    </Space>
    )
}
