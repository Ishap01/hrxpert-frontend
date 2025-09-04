import React from 'react'

const SummaryCard = ({icon: Icon , text , number,color}) => {
  return (
    <div className='rounded flex bg-white'>
      <div className={`text-3xl flex justify-center items-center ${color} text-white px-6`}>
            <Icon/>
      </div>
      <div className='pl-4 py-2'>
        <p className='text-lg font-semibold'>{text}</p>
        <p className='text-xl font-bold'>{number}</p>
       
      </div>
    </div>
  )
}

export default SummaryCard
