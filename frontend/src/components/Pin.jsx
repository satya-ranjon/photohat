/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoCloudDownload, IoArrowRedo } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";
import { Download } from "../styles/search.styled";

export default function Pin({
  pin: { postedBy, image, _id, destination, save },
}) {
  const [PostHovered, setSetPostHovered] = useState(false);
  const user = fetchUser();
  const navigate = useNavigate();

  // prettier-ignore
  const alreadySaved = !!(save?.filter(item => item.postedBy?._id === user?.googleId))?.length;
  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setSetPostHovered(true)}
        onMouseLeave={() => setSetPostHovered(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
        className="relative cursor-zoom-in w-auto 
        hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="image"
          className="rounded-lg w-full"
        />

        {PostHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pb-2 z-5">
            <div className="flex justify-between items-center">
              {/* download */}
              <div className="flex gap-2">
                <Download
                  href={`${image?.asset?.url}?dl`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-red-200 text-red-500 w-9 h-9 rounded-full flex items-center justify-center 
                  text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <IoCloudDownload />
                </Download>
              </div>
              {/* savepost */}
              {alreadySaved ? (
                <button
                  disabled
                  type="button"
                  className="bg-red-500 cursor-zoom-in text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex  justify-between items-center gap-2 w-full">
              {destination && (
                <Download
                  href={destination}
                  target="_blank"
                  rel="norefferer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-red-200 flex items-center gap-2 text-red-500 font-bold p-1 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <IoArrowRedo />
                  {destination.length > 15
                    ? `${destination.slice(0, 15)}....`
                    : destination}
                </Download>
              )}
              {postedBy?._id === user?.googleId && (
                <button
                  className="bg-red-200 flex items-center gap-2 text-red-500 font-bold p-3 text-xl
                rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          src={postedBy?.image}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
}
