import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // メニュー開閉でスクロール制御
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // スクロール禁止
    } else {
      document.body.style.overflow = ""; // 元に戻す
    }
    return () => {
      document.body.style.overflow = ""; // コンポーネントアンマウント時に戻す
    };
  }, [isOpen]);

  return (
    <header className="bg-blue-500 text-white shadow-md fixed top-0 left-0 w-full h-16 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 max-w-screen-md">
        {/* サイト名 */}
        <Link to="/" className="text-xl font-bold">
          気象データ比較
        </Link>

        {/* PCナビゲーション */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-lg hover:text-blue-200">
            Top
          </Link>
          <Link to="/report" className="text-lg hover:text-blue-200">
            Report
          </Link>
          <Link to="/about" className="text-lg hover:text-blue-200">
            About
          </Link>
        </nav>

        {/* ハンバーガーメニュー */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* オーバーレイ */}
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* スライドメニュー */}
      <div
        className={clsx(
          "fixed top-0 right-0 w-3/4 max-w-xs h-full bg-blue-500 text-white p-6 transform transition-transform duration-300 z-50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col space-y-6 text-lg">
          <Link
            to="/"
            className="hover:text-blue-300"
            onClick={() => setIsOpen(false)}
          >
            Top
          </Link>
          <Link
            to="/report"
            className="hover:text-blue-300"
            onClick={() => setIsOpen(false)}
          >
            Report
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
