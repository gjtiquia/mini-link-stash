export function Header() {
    return (
        <div className="flex justify-end items-center p-3 gap-3">
            <p
                className="text-sm"
            >
                About
            </p>
            <p
                className="text-sm"
            >
                GitHub
            </p>
            <button
                className="text-sm bg-black active:bg-gray-500 text-white font-bold px-4 py-1 rounded-md"
            >
                Sign In
            </button>
        </div>
    );
}
