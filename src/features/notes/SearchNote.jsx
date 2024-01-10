import React, { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useNotes } from "@/store";

function SearchNote() {
  const { filterValue, setFilterValue } = useNotes((state) => state);

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="absolute top-16 min-[450px]:top-20 min-[640px]:top-9 left-[50%] translate-x-[-50%]">
      <span className="absolute top-[0.85rem] left-3">
        <MagnifyingGlassIcon />
      </span>
      <Input
        placeholder="Search notes..."
        onChange={handleInputChange}
        value={filterValue}
        className="px-8 rounded-full"
      />
      <span
        className={`cursor-pointer absolute top-[0.85rem] right-4 ${
          filterValue.length > 0 ? "" : "hidden"
        }`}
        onClick={() => setFilterValue("")}
      >
        <Cross1Icon />
      </span>
    </div>
  );
}

export default SearchNote;
