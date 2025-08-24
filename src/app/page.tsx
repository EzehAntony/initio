"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SplashScreen = () => {
  const [ isVisible, setIsVisible ] = useState( false );
  const router = useRouter();

  useEffect( () => {
    // Trigger animation after component mounts
    const timer = setTimeout( () => {
      setIsVisible( true );
    }, 100 );

    // Redirect to /home after animation completes (total duration: 2.7s)
    const redirectTimer = setTimeout( () => {
      router.push( "/home" );
    }, 2700 );

    return () => {
      clearTimeout( timer );
      clearTimeout( redirectTimer );
    };
  }, [ router ] );

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background pattern */ }
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      {/* Main content */ }
      <div className={ `relative z-10 flex flex-col items-center space-y-8 transition-all duration-1000 ease-out ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }` }>

        {/* Logo */ }
        <div className={ `relative transition-all duration-1000 delay-300 ${ isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }` }>
          <Image
            src="/logo.png"
            alt="Initio Logo"
            width={ 120 }
            height={ 120 }
            className="drop-shadow-2xl"
            priority
          />
        </div>

        {/* Brand name */ }
        <div className={ `text-center transition-all duration-1000 delay-500 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }` }>
          <h1 className="text-6xl font-bold text-white tracking-wider mb-2">
            initio
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Subtitle */ }
        <div className={ `text-center transition-all duration-1000 delay-700 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }` }>

        </div>
      </div>

      {/* Floating particles effect */ }
      <div className="absolute inset-0 pointer-events-none">
        { [ ...Array( 6 ) ].map( ( _, i ) => (
          <div
            key={ i }
            className={ `absolute w-2 h-2 bg-blue-500/20 rounded-full animate-pulse` }
            style={ {
              left: `${ Math.random() * 100 }%`,
              top: `${ Math.random() * 100 }%`,
              animationDelay: `${ i * 0.5 }s`,
              animationDuration: `${ 3 + Math.random() * 2 }s`
            } }
          />
        ) ) }
      </div>
    </div>
  );
};

export default SplashScreen;