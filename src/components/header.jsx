const Header = () => {
  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <img
        src="./icon.svg"
        className="bg-gray-600 opacity-50 w-10 m-2 ml-4 rounded-lg border-2 border-white/100 border-opacity-100 border-dashed hover:bg-gray-700 hover:opacity-100 hover:bg-slate-400"
      />
      <button
        onClick={Logout}
        className="py-2.5 px-3 m-2 mr-4 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border-2 border-dashed focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:border-white/100"
      >
        Exit
      </button>
    </>
  );
};

export default Header;
