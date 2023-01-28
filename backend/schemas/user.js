import { BiUserCircle } from "react-icons/bi";

export default {
  name: "user",
  title: "User",
  icon: BiUserCircle,
  type: "document",
  fields: [
    {
      name: "userName",
      title: "UserName",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "string",
    },
  ],
};
