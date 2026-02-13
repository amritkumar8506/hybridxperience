function Navbar() {
  return (
<nav className="fixed w-full px-16 py-6 flex justify-between items-center 
bg-black/80 backdrop-blur-xl border-b border-white/10 z-[9999]
">
<h2 className="text-xl font-semibold tracking-widest text-white">
  HYBRID
</h2>

<ul className="flex gap-10 text-sm text-white">

        <li className="hover:text-purple-400 cursor-pointer">Installations</li>
        <li className="hover:text-purple-400 cursor-pointer">Studio</li>
        <li className="hover:text-purple-400 cursor-pointer">Lab</li>
      </ul>
    </nav>
  );
}

export default Navbar;
