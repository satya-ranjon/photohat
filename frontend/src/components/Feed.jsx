import React, { useEffect, useState } from "react";
import { SpinnerAudio } from "./Spinner";
import NotFound from "../assets/images/notFound.svg";
import MasonryLayout from "./MasonryLayout";
import { useParams } from "react-router-dom";
import { feedQuery, searchQuery } from "../utils/data";
import { client } from "../client";

export default function Feed() {
  const [loadign, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  // get catagore from url
  const { catagoryeId } = useParams();
  useEffect(() => {
    setLoading(true);
    if (catagoryeId) {
      const query = searchQuery(catagoryeId);
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
  }, [catagoryeId]);

  if (loadign) return <SpinnerAudio msg="New feeds are loading" />;
  if (!pins?.length)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>Sorry 🙇 No Feed Available</p>
        <img src={NotFound} className="w-[30%] mt-5" alt="" />
      </div>
    );
  return pins && <MasonryLayout pins={pins} />;
}
