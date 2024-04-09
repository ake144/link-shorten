

# URL Shortener

A URL shortener web application built with Next.js, Redis Upstash for database storage, and Shadcn for UI components.

## Overview

This web application allows users to shorten URLs, making them more manageable and easier to share. It provides a simple interface for users to input a long URL and receive a shortened version that redirects to the original URL.

## Features

- Shorten long URLs to more manageable links
- Store shortened URLs in a Redis Upstash database
- Simple and user-friendly interface
- Built with modern web technologies for optimal performance

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [Redis Upstash](https://upstash.com/) - Redis cloud service for database storage
- [Shadcn](https://shadcn.com/) - UI component library for styling and user interface design
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/url-shortener.git
   ```

2. Install dependencies:

   ```bash
   cd url-shortener
   npm install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```plaintext
   NEXT_PUBLIC_REDIS_URL=your-redis-upstash-url
   ```

   Replace `your-redis-upstash-url` with your Redis Upstash connection URL.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. Enter a long URL into the input field.
2. Click the "Shorten" button to generate a shortened URL.
3. Copy the shortened URL and share it as needed.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).

---
