import { NextResponse } from "next/server";
import { redis } from "../../../../lib/redis";


export  async function GET(){
  const link = (await redis.hgetall('links')) || [];
  console.log(link)
  return NextResponse.json({link}, { status: 200 });
}