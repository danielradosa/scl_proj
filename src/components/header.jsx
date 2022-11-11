// create headr component with logo and search bar
const Header = () => {
  return (
    <div className="h-cont">
      <div className="header">
        <h2>SOCIALink</h2>
        <input type="search" placeholder="Search" />
      </div>
    </div>
  );
};

export { Header };
