import houseIllustration from "../../../assets/house_illustration.png";

const CategoryHeader = () => {
  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-red-500/10 via-orange-500/5 to-transparent dark:from-red-950/20 dark:via-[#0e1422]/10 dark:to-transparent border border-red-500/10 dark:border-slate-800/80 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center">
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-60 h-60 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/10 dark:from-red-900/10 dark:to-transparent blur-3xl -z-10 animate-pulse"></div>

      <div className="z-10 text-center md:text-left space-y-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit tracking-tight leading-tight text-gray-900 dark:text-white">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Perfect Stay</span>
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium text-sm sm:text-base max-w-md">
          Explore and book handpicked verified homes across India's most breathtaking locations.
        </p>
      </div>

      <div className="hidden md:block relative w-56 h-28 flex-shrink-0">
        <img 
          src={houseIllustration} 
          alt="Illustration" 
          className="w-full h-full object-contain drop-shadow-2xl scale-125 transform translate-y-2 select-none"
        />
      </div>
    </div>
  );
};

export default CategoryHeader;
