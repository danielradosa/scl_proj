// header component with logo and search bar
const Header = () => {
  return (
    <div className="flex bg-white">
      <div className="flex mt-4 mb-4">
        <h2 className="mr-2 text-lg leading-10">SOCIALink</h2>
        <input
          type="search"
          placeholder="Search"
          className="p-2 text-slate-500"
        />
      </div>
    </div>
  );
};

export { Header };
