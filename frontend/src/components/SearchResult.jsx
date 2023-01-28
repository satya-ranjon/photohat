import React, { useState, useEffect } from "react";

import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import { SpinnerBallTriangle } from "./Spinner";
import NotFound from "../assets/images/notFound.svg";

export default function SearchResult({ searchTerm, setsearchTerm }) {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <SpinnerBallTriangle msg={"Searching for pins"} />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <p>Sorry 🙇 No Pins found</p>
          <img src={NotFound} className="w-[30%] mt-5" alt="" />
        </div>
      )}
    </div>
  );
}
