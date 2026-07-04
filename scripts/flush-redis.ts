import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'

dotenv.config()

async function main() {
  const redis = Redis.fromEnv()
  const result = await redis.flushall()
  console.log('Redis FLUSHALL result:', result)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
