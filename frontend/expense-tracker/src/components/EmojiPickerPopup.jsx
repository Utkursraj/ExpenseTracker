import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6 relative">
            
           
            <div 
                className="flex items-center gap-4 cursor-pointer" 
                onClick={() => setIsOpen(true)}
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-violet-500 rounded-lg">
                    {icon ? (
                        
                        <span className="text-3xl">{icon}</span>
                    ) : (
                        <LuImage />
                    )}
                </div>

                <p className="text-sm text-gray-600">
                    {icon ? "Change Icon" : "Pick Icon"}
                </p>
            </div>

            {/* Popup Container */}
            {isOpen && (
                <div className="absolute top-14 left-0 z-20 bg-white border border-gray-200 rounded-lg shadow-xl">
                    
                    {/* Close Button */}
                    <button 
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-30 cursor-pointer hover:bg-gray-100"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            setIsOpen(false);
                        }}
                    >
                        <LuX className="text-gray-500" />
                    </button>

                    <EmojiPicker 
                        open={isOpen}
                        onEmojiClick={(emojiObject) => {
                            
                            onSelect(emojiObject.emoji); 
                            setIsOpen(false); // 
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;