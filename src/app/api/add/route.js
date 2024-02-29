// Import required modules

import { redis } from '@/../lib/redis';
import { NextResponse,NextRequest } from 'next/server';


export async function POST(req, res) {

   const body = await req.json();


  const { originalURL } =body;
  // console.log(originalURL);
  // console.log(req)

  if (!originalURL || originalURL.length > 255 || originalURL.length <= 0) {
    return NextResponse.json({ error: 'Please enter a valid URL' }, { status: 400 });
  }

  const short_url = makeShortUrl(4);

  let result = await redis.hset('links', { [short_url]: originalURL });

  return NextResponse.json({ result }, { status: 200 });
}

// Helper function to generate a short URL
const makeShortUrl = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let short_url = '';
  for (let i = 0; i < length; i++) {
    short_url += chars[Math.floor(Math.random() * chars.length)];
  }
  return short_url;
}
