// src/lib/tw.ts
import { create } from "twrnc";

const tw = create(require("../../tailwind.config"));
// const tw = create({
//   theme: {
//     extend: {
//       colors: {
//         primary: "#F1F3E0",
//         blue: {
//           500: "#FFA239", // override or custom
//         },
//         red: {
//           500: "#ef4444",
//         },
//         green: {
//           600: "#16a34a",
//         },
//       },

//       fontFamily: {
//         "urb-bold": "Urbanist-Bold",
//         "urb-reg": "Urbanist-Regular",
//       },
//     },
//   },
// });

export default tw;
