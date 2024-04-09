'use client'
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import {ShortenButton}  from './../components/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"




export default function Home() {
  const [originalURL, setOriginal] = useState('');
  const [shortURLs, setShortURLs] = useState([]);
  const { toast } = useToast()

  const handleShortenURL = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalURL }),
      });
      if (!res.ok) {
        throw new Error('Failed to shorten URL');
      }
      toast({
        title: "URL Shortened",
        description: "Your URL has been successfully shortened.",
        status: "success",
      });
      setOriginal('');
      await refreshLinks();
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const getLinks = async () => {
    try {
      const res = await fetch('/api/links');
      if (!res.ok) {
        throw new Error('Failed to fetch links');
      }
      const data = await res.json();
      // Convert object into array of objects
      return Object.entries(data.link || {}).map(([short, long]) => ({ short, long }));
    } catch (error) {
      console.error('Error fetching links:', error);
      return [];
    }
  };
  

  const refreshLinks = async () => {
    const links = await getLinks();
    console.log(links)
    setShortURLs(links);
  };

  const onShortUrlClick = (shortUrl) => {
    // const url = `http://localhost:3000/go/${shortUrl}`;
    // window.open(url, '_blank');

    const originalUrl = shortURLs.find(url => url.short === shortUrl)?.long;
  if (originalUrl) {
    window.location.href = originalUrl;
  } else {
    console.error("Original URL not found for short URL:", shortUrl);
    // Handle error: Original URL not found
  }

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
    refreshLinks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form className="flex flex-col items-center justify-center min-h-screen py-2" onSubmit={handleShortenURL}>
        <h1 className="text-4xl font-bold">URL Shortener</h1>
        <Input // Use shadcn input component
          className="text-black m-3 p-2" // Add className prop for styling
          type="url"
          placeholder="Enter your URL"
          value={originalURL}
          onChange={(e) => setOriginal(e.target.value)}
        />
        <ShortenButton/>
      </form>

      <Table>
        <TableCaption>A List of Shortened urls</TableCaption>
        <TableHeader>
          <TableRow className="gap-3 ">
            <TableHead className="m-3 p-3">Short URL</TableHead>
            <TableHead className="m-3 p-3 ">Original URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody  className="gap-6">
          {shortURLs.map(({ short, long }) => (
            <TableRow key={short}>
              <TableCell onClick={() => onShortUrlClick(short)}>{`http://localhost:3000/go/${short}`}</TableCell>
              <TableCell>{long}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
