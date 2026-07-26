import houseIllustration from "../../../assets/house_illustration.png";

const CategoryHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative">
      <div className="z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight leading-tight mb-2">
          Find a Home
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium text-sm sm:text-base">
          Explore verified homes across top locations
        </p>
      </div>

      <div className="hidden md:block relative w-64 h-32">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gray-100 dark:bg-slate-800/40 rounded-full blur-2xl -z-10 transform -translate-y-8 translate-x-8"></div>
        <img 
          src={houseIllustration} 
          alt="Illustration" 
          className="w-full h-full object-contain drop-shadow-xl absolute top-[-40px] right-0 scale-125 origin-right"
        />
      </div>
    </div>
  );
};

export default CategoryHeader;
