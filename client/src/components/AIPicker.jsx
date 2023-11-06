import React from "react";

import CustomButton from "./CustomButton";

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className='aipicker-container'>
      <textarea
        className='aipicker-textarea'
        placeholder='Ask AI...'
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton
            type='outline'
            customStyles='text-xs'
            title='Asking AI...'
          />
        ) : (
          <>
            <CustomButton
              title='AI ロゴ'
              type='outline'
              handleClick={() => handleSubmit("logo")}
              customStyles='text-xs'
            />
            <CustomButton
              title='AIテクスチャ'
              type='filled'
              handleClick={() => handleSubmit("full")}
              customStyles='text-xs'
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
