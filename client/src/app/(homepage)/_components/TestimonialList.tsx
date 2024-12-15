import React from "react";
import Testimonial from "./Testimonial";

const TestimonialList = () => {
  return (
    <section className="mt-24">
      <h1 className="text-5xl font-semibold text-center">
        Kata <span className="text-primary-color">Mereka</span>
      </h1>
      <div className="mt-12 [mask-image:linear-gradient(to_right,transparent,black_25%,black_70%,transparent)] overflow-hidden">
        <Testimonial duration={12} />
        <Testimonial duration={10} />
      </div>
    </section>
  );
};

export default TestimonialList;
