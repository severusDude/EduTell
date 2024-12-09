import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import ListCard from "../_components/ListCard";
import Blob from "../_components/Blob";
import CardCourse from "@/components/CardCourse";
import CardReview from "../_components/CardReview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Testimonial from "../_components/Testimonial";
import HeroSection from "../_components/HeroSection";
import Overview from "../_components/Overview";
import CourseList from "../_components/CourseList";
import TestimonialList from "../_components/TestimonialList";
import FAQ from "../_components/FAQ";

export default function Home() {
  return (
    <main>
      {/* hero section start */}
      <HeroSection />
      {/* hero section end */}

      {/* list section start */}
      <div className="mt-24 lg:block">
        <ListCard />
      </div>
      {/* list section end */}

      {/* Section 2 start */}
      <Overview />
      {/* Section 2 end */}

      {/* Section Course start */}
      <CourseList />
      {/* Section Course end */}

      {/* Section Review Start */}
      <TestimonialList />
      {/* Section Review End */}

      {/* Section FAQ Start */}
      <FAQ />
      {/* Section FAQ End */}
    </main>
  );
}
