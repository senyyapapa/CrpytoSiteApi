'use client';

import { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import CryptoCard from "../components/Card";
import axios from "axios";
import DynamicHead from "../components/DynamicHead";

function getItem(label, key) {
    return { key, label };
}

export default function Home() {
    const [data, setData] = useState({
        currencies: [],
        currentCurrency: null,
        isLoading: true,
    });

    const onClick = ({ key }) => {
        const selectedCurrency = data.currencies.find((c) => c.id === Number(key));
        setData((prev) => ({
            ...prev,
            currentCurrency: selectedCurrency,
        }));
    };

    const fetchCurrencies = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/cryptocurrencies');
            const currenciesResponse = res.data.data || res.data;
            const firstCurrency = currenciesResponse[0] || null;
            console.log(currenciesResponse);
            setData({
                currencies: currenciesResponse,
                currentCurrency: firstCurrency,
                isLoading: false,
            });
        } catch (error) {
            console.error("Error fetching currencies:", error);
            setData((prev) => ({ ...prev, isLoading: false }));
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    if (data.isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    const menuItems = data.currencies.map((currency) =>
        getItem(currency.name, String(currency.id))
    );

    const currentCurrency = data.currentCurrency;

    return (
        <>
            {currentCurrency && (
                <DynamicHead
                    title={`${currentCurrency.name} - Crypto Tracker`}
                    iconUrl={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currentCurrency.id}.png`}
                />
            )}
            <div className="flex gap-3">
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={[String(currentCurrency?.id)]}
                    mode="inline"
                    items={menuItems}
                    className="h-screen overflow-scroll"
                />
                <div className="mx-auto my-auto">
                    {currentCurrency ? (
                        <CryptoCard currency={currentCurrency} />
                    ) : (
                        <div>No currency selected.</div>
                    )}
                </div>
            </div>
        </>
    );
}
