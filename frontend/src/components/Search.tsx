import { Input } from "@mantine/core";

const Search = () => {
  return (
    <div className="">
      <Input
        size="md"
        radius="md"
        placeholder="Search here..."
        classNames={{
          input: "focus:outline-none focus:ring-2 focus:ring-red-500 border-red-500",
        }}
      />
    </div>
  );
};

export default Search;
