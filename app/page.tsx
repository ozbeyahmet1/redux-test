"use client";

import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { close, open } from "../state/slices/exampleSlice";
export default function Home() {
  const value = useSelector((state: RootState) => state.exampleReducer.value);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(open());
  };

  const handleClose = () => {
    dispatch(close());
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Value: {value ? "True" : "False"}</p>
      <button onClick={handleOpen}>Open</button>
      <button onClick={handleClose}>Close</button>
    </main>
  );
}
