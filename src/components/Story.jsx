import React from 'react'
import AnimatedTitle from './AnimatedTitle'

const Story = () => {
  return (
    <section id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
        <div className="flex size-full flex-col items-center py-10 pb-24">
            <p className="font-general  text-sm uppercase md:text-[10px]">
                the multiversal ip world
            </p>

            <div className="relative size-full">
                <AnimatedTitle 
                    title='The st<b>o</b>ry <b>o</b>f <br /> a hid<b>d</b>en real<b>m</b>'
                    sectionId='#story'
                    containerClass='mt-5 pointer-events-none mix-blend-differnce relative z-10'
                />

                <div className="story-img-container"></div>
            </div>
        </div>
    </section>
  )
}

export default Story