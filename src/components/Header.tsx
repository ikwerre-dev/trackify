import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white py-4 px-6 md:px-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors">
          Trackify
        </Link>
        <div className="flex gap-6">
          <Link href="/track" className="text-white hover:text-orange-500 transition-colors">
            Track Package
          </Link>

        </div>
      </nav>
    </header>
  );
}