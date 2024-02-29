// src/app/go/[...path].js
import { redis } from '@/../lib/redis';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
      

  const { path } = req.params;
  const shortUrl = path.join('/');
  const originalURL = await redis.hget('links', shortUrl);
  
  console.log(originalURL);
  if (originalURL) {
    if (originalURL.startsWith('http') || originalURL.startsWith('https')) {
      return NextResponse.redirect(originalURL);
    }

    return NextResponse.redirect(`https://${originalURL}`);
  }

  return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
}
