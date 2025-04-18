import Listings from "../components/Listings";
import Hero from "../components/Hero";
import Filter from "../components/Filter";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="px-10 bg-gray-100 mt-5">
      {/* 👇 This section only visible on lg and above */}
      <div className="hidden lg:flex items-center justify-between mb-5">
        <Hero />
        <Search />
        <Filter />
      </div>

      {/* 👇 This section only visible below lg */}
      <div className="block lg:hidden">
        <Hero />
        <div className="grid grid-cols-2 gap-6 my-5">
          <Search />
          <Filter />
        </div>
      </div>

      <Listings />
    </div>
  );
};

export default Home;
