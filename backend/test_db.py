import asyncio
import asyncpg

async def main():
    conn = await asyncpg.connect(
    "postgresql://postgres:password123@127.0.0.1:5433/lenny_assistant"
)
    value = await conn.fetchval("SELECT 1")
    print(value)
    await conn.close()

asyncio.run(main())