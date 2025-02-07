import ListCard from "../_components/ListCard";
import HeroSection from "../_components/HeroSection";
import Overview from "../_components/Overview";
import CourseList from "../_components/CourseList";
import TestimonialList from "../_components/TestimonialList";
import FAQ from "../_components/FAQ";

export default function Home() {
  return (
    <main className="lg:mt-16">
      <HeroSection />
      <ListCard />
      <Overview />
      <CourseList />
      <TestimonialList />
      <FAQ />
    </main>
  );
}
