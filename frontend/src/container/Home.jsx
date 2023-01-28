import React, { useRef, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import Img from "../assets/images/Camera.webp";
import { client } from "../client";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";
import Pin from "./Pin";

export default function Home() {
  const scrollRef = useRef(null);
  const [user, setUser] = useState(null);

  // getting the logged in user info from the LocalStorage

  // const userInfo =
  //   localStorage.getItem("user") !== "undefined"
  //     ? JSON.parse(localStorage.getItem("user"))
  //     : localStorage.clear();
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-full transition-height duration-75 ease-out">
      <div className="pb-2 flex-1 h-screen " ref={scrollRef}>
        <Routes>
          <Route path="/*" element={<Pin user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

// overflow-y-scroll hide_scrollbar
