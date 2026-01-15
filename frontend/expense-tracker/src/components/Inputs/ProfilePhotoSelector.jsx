import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
           
            setImage(file);
            
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null); 
        if (inputRef.current) {
            inputRef.current.value = ""; 
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

   
    useEffect(() => {
        
        if (typeof image === 'string') {
            setPreviewUrl(image);
        }

        return () => {
            
            if (previewUrl && typeof previewUrl === 'string' && !previewUrl.startsWith('http')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [image]);

    return (
        <div className='flex justify-center mb-6'>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                
                <div className='w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full relative'>
                    <LuUser className='text-4xl text-blue-600' />
                    
                    <button 
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-blue-700 transition-colors"
                        onClick={onChooseFile}
                    >
                        <LuUpload size={16} />
                    </button>
                </div>
            ) : (
                
                <div className='relative'>
                    <img 
                        src={previewUrl}
                        alt='profile preview'
                        className='w-20 h-20 rounded-full object-cover border-2 border-gray-200' 
                    />

                    <button 
                        type="button"
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-red-600 transition-colors'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;