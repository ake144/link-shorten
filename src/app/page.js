'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [originalURL, setOriginal] = useState('');
  const [shortURL, setShort] = useState({});
  
  const handleShortenURL = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/add', {
      method: 'POST',
      body: JSON.stringify({ originalURL }),
    });
    const data = await res.json();
    setOriginal('')
    await refreshLinks()
    // Assuming your API returns the shortened URL in the 'result' field
  };

  const getLinks = async () => {
    const res = await fetch('/api/links');
    const resData = await res.json();

    console.log('the response from the API', resData.link);
    return resData?.link; // Return the parsed JSON response
  };

  const refreshLinks = async () => {
    const urlObj = await getLinks();
    setShort(urlObj);
  };

  const onShortUrlClick = (shortUrl) => {
    const url = `http://localhost:3000/go/${shortUrl}`;
    window.open(url, '_blank');

    navigator.clipboard.writeText(url).then(
      () => {
        alert("Copied link to the clipboard");
        console.log("Copied link to the clipboard");
      },
      () => {
        alert("Could not copy the link to clipboard.");
      }
    );
  };

  useEffect(() => {
    (async () => {
      await refreshLinks();
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form className="flex flex-col items-center justify-center min-h-screen py-2" onSubmit={handleShortenURL}>
        <h1 className="text-4xl font-bold">URL Shortener</h1>
        <input className="text-black m-3 p-2" type="url" placeholder="Enter your URL" value={originalURL} onChange={(e) => setOriginal(e.target.value)} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-5 m-5 font-bold py-2 px" type="submit">
          Shorten
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <td>Short url</td>
            <td>Original url</td>
          </tr>
        </thead>
              <tbody>
        {Object?.entries(shortURL).map(([short, long]) => (
          <tr key={short}>
            <td onClick={() => onShortUrlClick(short)}>{`http://localhost:3000/go/${short}`}</td>
            <td>{long}</td>
          </tr>
        ))}
      </tbody>

      </table>
    </div>
  );
}
