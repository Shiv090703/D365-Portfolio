import React, { useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleExplore = () => {
    setLoading(true);
    // Simulate network authentication delay
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center font-['Segoe_UI'] bg-cover bg-center"
         style={{
             backgroundImage: 'url("https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wEaC?ver=1543")',
             backgroundColor: '#f0f2f5' // Fallback
         }}
    >
      <div className="bg-white p-11 w-[440px] shadow-2xl relative min-h-[380px] animate-[fadeIn_0.5s_ease-out] flex flex-col">
         
         {/* Microsoft Logo */}
         <div className="flex items-center gap-2 mb-8">
             <svg width="108" height="24" viewBox="0 0 108 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
                <rect x="12" y="0" width="11" height="11" fill="#7FBA00"/>
                <rect x="0" y="12" width="11" height="11" fill="#00A4EF"/>
                <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
                <text x="30" y="17" fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif" fontSize="19" fontWeight="600" fill="#737373">Microsoft</text>
             </svg>
         </div>

         {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center fade-in">
                 <h2 className="text-xl font-semibold mb-8 text-[#1b1b1b]">Signing you in...</h2>
                 <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 bg-[#0067b8] rounded-full animate-bounce"></div>
                     <div className="w-1.5 h-1.5 bg-[#0067b8] rounded-full animate-bounce delay-75"></div>
                     <div className="w-1.5 h-1.5 bg-[#0067b8] rounded-full animate-bounce delay-150"></div>
                     <div className="w-1.5 h-1.5 bg-[#0067b8] rounded-full animate-bounce delay-300"></div>
                     <div className="w-1.5 h-1.5 bg-[#0067b8] rounded-full animate-bounce delay-500"></div>
                 </div>
             </div>
         ) : (
            <div className="fade-in flex flex-col h-full">
                <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-2">Welcome</h1>
                
                {/* User Profile / Lite Details */}
                <div className="mt-4 mb-8 flex items-center gap-4 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors cursor-default">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                        S
                    </div>
                    <div>
                        <div className="font-semibold text-[#1b1b1b]">Shivam</div>
                        <div className="text-sm text-gray-500">Dynamics 365 & .NET Developer</div>
                    </div>
                </div>

                <div className="flex-1"></div>

                <div className="flex justify-end mt-4">
                     <button 
                        onClick={handleExplore} 
                        className="bg-[#0067b8] text-white px-8 py-2 font-semibold text-[15px] hover:bg-[#005da6] transition-colors shadow-sm w-full sm:w-auto"
                     >
                         Explore Portfolio
                     </button>
                </div>
             </div>
         )}
      </div>
      
      {/* Footer Links */}
      <div className="absolute bottom-4 right-4 flex gap-4 text-xs text-black/60">
          <span className="hover:underline cursor-pointer">Terms of use</span>
          <span className="hover:underline cursor-pointer">Privacy & cookies</span>
          <span className="hover:underline cursor-pointer">...</span>
      </div>
      
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;