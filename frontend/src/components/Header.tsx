import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

export default function Header({ onClear, hasMessages, theme, toggleTheme, }: { onClear: () => void; hasMessages: boolean;  theme: "dark" | "light"; toggleTheme: () => void; }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-[#2e2e2e] bg-white dark:bg-[#0f0f0f]">
      <div className="flex items-center gap-3">
        {/* F1 logo mark */}
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-6 bg-[#e10600] rounded-sm" />
          <span className="text-black dark:text-white font-bold text-lg tracking-tight leading-none">
            F1
          </span>
          <div className="w-1 h-6 bg-[#e10600] rounded-sm" />
        </div>
        <div className="h-5 w-px bg-gray-300 dark:bg-[#2e2e2e]" />
        <span className="text-gray-600 dark:text-gray-400 text-sm font-medium tracking-wide uppercase">
          Blue Lock
        </span>
      </div>

      <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="h-[36px] px-3 rounded border border-gray-300 dark:border-[#2e2e2e] text-xs hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <button
        onClick={toggleTheme}
        className="h-[36px] w-[36px] rounded border border-gray-300 dark:border-[#2e2e2e] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer flex items-center justify-center text-sm"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {hasMessages && (
        <button
          onClick={onClear}
          className="h-[36px] px-3 rounded border border-gray-300 dark:border-[#2e2e2e] text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
        >
          New chat
        </button>
      )}
      </div>
    </header>
  );
}
