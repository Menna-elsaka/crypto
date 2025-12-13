import { useEffect, useState } from 'react';

type Props = {
  digest: string;
};

export function FinalDigestAnimated({ digest }: Props) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let index = 0;
    setVisibleText('');

    const timer = setInterval(() => {
      index++;
      setVisibleText(digest.slice(0, index));

      if (index >= digest.length) {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [digest]);

  return (
    <div className="p-6 rounded-xl bg-black border-2 border-green-500 text-green-400 font-mono text-sm shadow-lg">
      
      <h3 className="text-white font-bold mb-3 text-center">
        ✅ Final Secure Hash Output
      </h3>

      <div className="break-all tracking-widest animate-pulse">
        {visibleText}
        <span className="text-green-600">▌</span>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        This is the final result after all mixing rounds and compression
      </p>

    </div>
  );
}
