import Image from 'next/image';
import Link from 'next/link';
import image from '../public/Math-Logo.jpg'; 
const Hero = () => {
  return (
    <section className='flex flex-row md:flex-row items-center justify-between p-10 mt-10' id='Home'>
        {/* Left Content */}
        <div className='flex flex-col gap-4 w-1/2  justify-center'>
          <h1 className='text-[70px] font-extrabold leading-none'>One Course. One Goal. Your A+.</h1>
          <p className='text-[31px] font-light'>
            Built by Ethiopia's #1 university math professor. Over 90% of our students passed - many with A+.
          </p>
          <div className='flex gap-20 mt-10'>
              <a className='bg-black text-white h-15 p-5 flex items-center rounded-[5px] ' href='#pricing' >Get the Course Now</a>
          </div>
        </div>
        {/* Right Image */}
        <div className='flex justify-center items-center w-1/2'>
          <Image
            src={image} 
            alt="Math Equations"
            layout="fixed"
            width={500} 
            height={600}
            className="w-[500px] h-[600px] object-cover border-2 border-gray-950 rounded-[30] rotate-10 " 
            priority 

          />
        </div>
  
    </section>
  );
};

export default Hero;