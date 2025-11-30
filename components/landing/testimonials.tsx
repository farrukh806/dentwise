import Image from 'next/image';

const TestimonialsData = [
  {
    img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Person 1',
  },
  {
    img: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Person 2',
  },
  {
    img: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Person 3',
  },
];
const Testimonials = () => {
  return (
    <div className="flex -space-x-2">
      {TestimonialsData.map((testimonial, index) => (
        <Image
          key={index}
          src={testimonial.img}
          alt={testimonial.alt}
          width={48}
          height={48}
          className="object-cover w-12 h-12 ring rounded-full ring-background"
        />
      ))}
    </div>
  );
};

export default Testimonials;
