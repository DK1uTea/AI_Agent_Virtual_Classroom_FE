'use client'

import Image from 'next/image';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 animate-fade-in">

        {/* Spinner wrapper */}
        <div className="relative h-28 w-28 flex items-center justify-center">

          {/* Spinner border */}
          <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-primary border-r-purple-500 animate-spin" />

          {/* Inner circle with spacing */}
          <div className="relative z-10 h-20 w-20 rounded-full bg-background flex items-center justify-center shadow-md">

            {/* Logo */}
            <Image
              src="/AI_Classroom_Logo.png"
              alt="logo"
              width={64}
              height={64}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>

        <p className="text-base text-muted-foreground tracking-wide">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
