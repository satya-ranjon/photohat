import React, { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { SpinnerTriangle } from "./Spinner";
import { categories } from "../utils/data";

export default function CreatePin({ user }) {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImageAsset(doc);
          setLoading(false);
        })
        .catch((err) => console.log("image upload", err));
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-400 transition-all duration-150 ease-in-out">
          Please fill all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-red-50 lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-red-100 p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-red-300 w-full h-420">
            {loading && <SpinnerTriangle />}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold text-2xl">
                      <BiCloudUpload fontSize={30} className="text-red-500" />
                    </p>
                    <p className="text-lg text-red-400">
                      {!wrongImageType ? `Click to Upload` : `Wrong image type`}
                    </p>
                  </div>
                  <p className="mt-32 text-red-400 ">
                    Use High Quality Images less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img src={imageAsset?.url} alt="" className="h-full w-full" />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-200 text-xl text-red-500
                  cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          {/* user  */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here"
            className="outline-none text-base sm:text-lg border-b-2 border-red-400 placeholder-red-400 bg-red-100 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center rounded-lg bg-red-100">
              <img
                src={user?.image}
                alt=""
                className="w-10 h-10 bg-red-400 rounded-full"
              />
              <p className="font-bold text-red-400">{user?.userName}</p>
            </div>
          )}

          {/* about */}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="what is your pin about"
            className="outline-none text-base sm:text-lg border-b-2 border-red-400 placeholder-red-400 bg-red-100 p-2"
          />
          {/* destination */}
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-red-400 placeholder-red-400 bg-red-100 p-2"
          />
          <div className="flex flex-col">
            <div className="">
              <p className="mb-2  text-red-400 font-semibold text-lg sm:text-xl">
                Choose pin category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none text-red-400 bg-red-100 w-4/5 text-base border-b-2 border-red-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other">Select Category</option>
                {categories &&
                  categories.map((category) => (
                    <option
                      key={category.name}
                      className="text-base border-0 outline-none capitalize bg-white text-black"
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white 
                font-bold rounded-md w-28 outline-none p-2 hover:shadow-md duration-150 transition-all ease-in-out"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
