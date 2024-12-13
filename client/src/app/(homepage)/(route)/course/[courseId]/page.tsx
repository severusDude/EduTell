import HeaderSectionDetailCourse from "./_components/HeaderSectionDetailCourse";
import DescriptionSectionDetailCourse from "./_components/DescriptionSectionDetailCourse";
import PriceSectionDetailCourse from "./_components/PriceSectionDetailCourse";
import ButtonBack from "@/components/ButtonBack";

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <section className="px-4 mt-16 lg:mt-12 lg:px-0">
      <ButtonBack />
      <HeaderSectionDetailCourse />
      <div className="flex flex-col items-start gap-16 mt-12 lg:flex-row">
        <DescriptionSectionDetailCourse />
        <PriceSectionDetailCourse />
      </div>
    </section>
  );
}
