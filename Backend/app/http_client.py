import json

import aiohttp
from pymemcache.client import base

class CMCHTTPClient:
    def __init__(self, api_key: str, base_url: str = "https://pro-api.coinmarketcap.com"):
        self.api_key = api_key
        self.base_url = base_url
        self._session = None
        self._cache_client = base.Client(('localhost', 11211))

    async def init_session(self):
        if self._session is None:
            self._session = aiohttp.ClientSession(base_url=self.base_url)

    async def close_session(self):
        if self._session:
            await self._session.close()
            self._session = None

    async def get_listings(self):
        cache_key = 'cryptocurrencies-listings'
        cached_data = self._cache_client.get(cache_key)

        if cached_data:
            return json.loads(cached_data)

        if not self._session:
            raise RuntimeError("Client session is not initialized. Call 'init_session' first.")

        async with self._session.get(
                "/v1/cryptocurrency/listings/latest",
                headers={"X-CMC_PRO_API_KEY": self.api_key}
        ) as response:
            data =  await response.json()
            self._cache_client.set(cache_key, json.dumps(data), expire=60)
            return data

    async def get_currency(self, currency_id: int):
        cache_key = f"cryptocurrencies-{currency_id}"
        cached_data = self._cache_client.get(cache_key)

        if cached_data:
            return json.loads(cached_data)

        if not self._session:
            raise RuntimeError("Client session is not initialized. Call 'init_session' first.")

        async with self._session.get(
                f"/v1/cryptocurrency/quotes/latest?id={currency_id}",
                headers={"X-CMC_PRO_API_KEY": self.api_key}
        ) as response:
            data = await response.json()
            self._cache_client.set(cache_key, json.dumps(data), expire=60)
            return data
