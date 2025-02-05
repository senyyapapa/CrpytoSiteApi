import aiohttp


class CMCHTTPClient:
    def __init__(self, api_key: str, base_url: str = "https://pro-api.coinmarketcap.com"):
        self.api_key = api_key
        self.base_url = base_url
        self._session = None

    async def init_session(self):
        if self._session is None:
            self._session = aiohttp.ClientSession(base_url=self.base_url)

    async def close_session(self):
        if self._session:
            await self._session.close()
            self._session = None

    async def get_listings(self):
        if not self._session:
            raise RuntimeError("Client session is not initialized. Call 'init_session' first.")

        async with self._session.get(
                "/v1/cryptocurrency/listings/latest",
                headers={"X-CMC_PRO_API_KEY": self.api_key}
        ) as response:
            return await response.json()

    async def get_currency(self, currency_id: int):
        if not self._session:
            raise RuntimeError("Client session is not initialized. Call 'init_session' first.")

        async with self._session.get(
                f"/v1/cryptocurrency/quotes/latest?id={currency_id}",
                headers={"X-CMC_PRO_API_KEY": self.api_key}
        ) as response:
            return await response.json()
