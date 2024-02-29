import { NextResponse } from "next/server";
import { redis } from "../../../../lib/redis";


export  async function GET(){
  const link = (await redis.hgetall('links')) || [];
 
  return NextResponse.json({link}, { status: 200 });

}