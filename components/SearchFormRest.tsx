"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
const SearchFormRest = () => {
    const resetForm = () => {
        redirect("/?query=");
    };

  return (
    <div>
      <Button type="button" onClick={resetForm} className="search-btn text-white">
        <X className="size-5" />
      </Button>
    </div>
  );
};

export default SearchFormRest;
