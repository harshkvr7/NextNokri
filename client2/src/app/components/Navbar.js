"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const Navbar = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get("/api/headlines");
        setHeadlines(response.data);
      } catch (error) {
        console.error("Error fetching headlines:", error);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div className="w-3/4 justify-self-center">
      <div className="flex px-16 flex-row justify-between border-b pb-2 gap-9 pt-1 items-center border-b-slate-300">
        <div className="flex flex-row gap-10 items-center">
          <Link href="/" className="text-3xl font-semibold mr-10">
            NextNokri
          </Link>
          <Link href="/jobs" className="hover:underline transition-all text-lg">
            Jobs
          </Link>
          <Link href="/exams" className="hover:underline transition-all text-lg">
            Exams
          </Link>
        </div>

        <div className="flex items-center gap-2 border border-slate-300 p-1 rounded-md">
          <Image src="/search.png" width={20} height={20} alt="search-icon"></Image>
          <input
            type="text"
            placeholder="search"
            className="border-none outline-none p-1 text-sm h-100 focus:border-none rounded-md"
          />
        </div>
      </div>

      <div className="flex w-full justify-center gap-10 border-b-slate-700 border-b py-2">
        {headlines.length > 0 ? (
          headlines.map((headline) => (
            <Link
              key={headline.id}
              href={`/post/${headline.pid}`}
              className="font-medium text-gray-700 hover:text-blue-600 hover:underline transition-all"
            >
              {headline.headline_text}
            </Link>
          ))
        ) : (
          <div className="text-gray-500">No headlines available</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;