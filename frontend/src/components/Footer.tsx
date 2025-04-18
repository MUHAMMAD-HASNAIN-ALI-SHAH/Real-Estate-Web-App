const Footer = () => {
  return (
    <footer className="border-t mt-10 px-6 py-8 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; 2025 WanderLust — All rights reserved</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="">Privacy</a>
          <a href="#" className="">Terms</a>
          <a href="#" className="">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
