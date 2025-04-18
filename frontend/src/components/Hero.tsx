import {
  HiOutlineSun,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineStar,
  HiOutlineFire,
  HiOutlineCash,
  HiOutlineShoppingBag,
  HiOutlinePhotograph,
} from "react-icons/hi";

const categories = [
  { label: "Rooms", icon: HiOutlineSun, category: "Beach" },
  { label: "Icons", icon: HiOutlineCash, category: "Luxury" },
  { label: "Top cities", icon: HiOutlineShoppingBag, category: "Apartment" },
  { label: "Trending", icon: HiOutlineFire, category: "Beach" },
  { label: "Design", icon: HiOutlineHome, category: "Cabin" },
  { label: "Castles", icon: HiOutlineStar, category: "Luxury" },
  { label: "Amazing views", icon: HiOutlinePhotograph, category: "Beach" },
  { label: "Countryside", icon: HiOutlineOfficeBuilding, category: "Apartment" },
];

const HeroCategories = () => {
  return (
    <div className="flex justify-between lg:flex lg:overflow-x-auto lg:gap-6 lg:px-4 lg:py-2 lg:border-b sticky z-100">
      {categories.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-sm text-gray-600 cursor-pointer hover:text-black"
          >
            <Icon className="h-6 w-6 mb-1" />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default HeroCategories;
