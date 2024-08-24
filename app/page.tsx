"use client";

import { RootState } from "@/state/store";
import Navbar from "@layouts/navbar";
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
    <main className="">
      <Navbar />
    </main>
  );
}
