import React from "react";
import CategoryCard from "./CategoryCard";

const dataListCategoryOne = [
  {
    image: "icon/code.png",
    text: "Web Development",
  },
  {
    image: "icon/game.png",
    text: "Game Development",
  },
  {
    image: "icon/designtools.png",
    text: "UI/UX",
  },
];

const dataListCategoryTwo = [
  {
    image: "icon/data.png",
    text: "Data Analyst",
  },
  {
    image: "icon/mobile.png",
    text: "Mobile Development",
  },
  {
    image: "icon/command.png",
    text: "Machine Learning",
  },
];

const ListCategory = () => {
  return (
    <div className="mt-12 space-y-4">
      <div className="items-center justify-between space-y-4 lg:gap-4 lg:flex lg:space-y-0">
        {dataListCategoryOne.map((item, index) => (
          <CategoryCard key={index} image={item.image} text={item.text} />
        ))}
      </div>
      <div className="items-center justify-between space-y-4 lg:space-y-0 lg:gap-4 lg:flex">
        {dataListCategoryTwo.map((item, index) => (
          <CategoryCard key={index} image={item.image} text={item.text} />
        ))}
      </div>
    </div>
  );
};

export default ListCategory;
