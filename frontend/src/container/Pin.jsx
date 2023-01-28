import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreatePin,
  Feed,
  Navbar,
  PinDetail,
  SearchResult,
  UserProfile,
} from "../components";

export default function Pin({ user }) {
  const [searchTerm, setsearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-white">
        <Navbar
          searchTerm={searchTerm}
          setsearchTerm={setsearchTerm}
          user={user}
        />
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/catagorey/:catagoryeId" element={<Feed />} />
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route
              path="/pin-details/:pinId"
              element={<PinDetail user={user} />}
            />
            <Route path="/create-pin" element={<CreatePin user={user} />} />
            <Route
              path="/search-result"
              element={
                <SearchResult
                  searchTerm={searchTerm}
                  setsearchTerm={setsearchTerm}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
