interface GlowingInputProps{
  url: string,
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  onEnter?: () => void;
}

export default function GlowingInput({url, setUrl, onEnter}: GlowingInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  }

  return (
    // <div className="bg-gray-500 p-2 rounded-lg">
        <input 
          type="text" 
          className="w-full p-2 bg-white rounded-md text-base focus:outline-none focus:ring-2 focus:ring-orange-500" 
          value={url}
          onChange={(e) => setUrl(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder="Enter here..."
        />
    // </div>
  );
}
