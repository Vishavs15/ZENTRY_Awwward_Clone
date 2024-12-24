// when you are passing tailwind css by props and two css colaps like bg-gray-100 (in button) and passing bg-yellow-100 (by props) by when we use ! i starting of bg-yellow-100 yellow bg apply not gray. 
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(()=> {
    if(loadedVideos === totalVideos -1) {
      setIsLoading(false);
    }
  })

  useGSAP(() => {
    if(hasClicked) {
      gsap.set('#next-video', { visibility: 'visible' });

      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart:() => nextVideoRef.current.play()
      })

      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',

      })
    }

  },{dependencies: [currentIndex], revertOnUpdate: true})

  useGSAP(()=> {
    gsap.set('#video-frame', {
      // clipPath: 'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)',
      clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
      // borderRadius: '0% 0% 50% 50%'
    })

    gsap.from('#video-frame', {
      // clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 0% 100%)',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      // borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      }
    })
  })

  const videoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">

    {isLoading && (
      <div className="flex-center absolute z-[100] w-screen h-dvh overflow-hidden bg-violet-200">
        <div className="three-body">
          <div className="three-body__dot" />
          <div className="three-body__dot" />
          <div className="three-body__dot" />
        </div>
      </div>
    )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                loop
                muted
                ref={nextVideoRef}
                src={videoSrc(upcomingVideoIndex)}
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoaded}
              />
            </div>
          </div>

          <video
            loop
            muted
            ref={nextVideoRef}
            src={videoSrc(currentIndex)}
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />

          <video 
            autoPlay loop muted 
            src={videoSrc(currentIndex == totalVideos -1 ? 1 : currentIndex)}
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the Metagame layer <br /> Unleash the Play Economy</p>

            <Button id='watch-trailer' title='Watch Trailer' leftIcon={<TiLocationArrow/>}
            containerClass='!bg-yellow-300 flex-center gap-1'/>
          </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
            {/* G<b>a</b>ming */}
            <b>gaming</b>
        </h1>
 
      </div>

      <h1 className="behind the video div special-font hero-heading absolute bottom-5 right-5 text-black">
            {/* G<b>a</b>ming */}
            <b>gaming</b>
        </h1>

    </div>
  );
};

export default Hero;

// 39:11 / 2:39:34

// •
// Hero Section