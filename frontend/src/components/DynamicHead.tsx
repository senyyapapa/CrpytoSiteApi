'use client';

import { useEffect } from 'react';

type DynamicHeadProps = {
    title: string;
    iconUrl: string;
};

export default function DynamicHead({ title, iconUrl }: DynamicHeadProps) {
    useEffect(() => {
        // Обновление заголовка
        document.title = title;

        // Обновление favicon
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.setAttribute("href", iconUrl);
        } else {
            const newFavicon = document.createElement("link");
            newFavicon.rel = "icon";
            newFavicon.href = iconUrl;
            document.head.appendChild(newFavicon);
        }
    }, [title, iconUrl]);

    return null; // Компонент ничего не рендерит
}
