from fastapi import APIRouter
from app import cmc_client


router = APIRouter(prefix="/cryptocurrencies", tags=["cryptocurrencies"])


@router.get("")
async def get_currencies():
    return await cmc_client.get_listings()

@router.get("/{currency_id}")
async def get_currency(currency_id: int):
    return await cmc_client.get_currency(currency_id)