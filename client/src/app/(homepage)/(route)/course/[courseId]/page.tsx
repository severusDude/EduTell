import HeaderSectionDetailCourse from "./_components/HeaderSectionDetailCourse";
import DescriptionSectionDetailCourse from "./_components/DescriptionSectionDetailCourse";
import PriceSectionDetailCourse from "./_components/PriceSectionDetailCourse";

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <section className="mt-12">
      <HeaderSectionDetailCourse />
      <div className="flex items-start gap-16 mt-12">
        <DescriptionSectionDetailCourse />
        <PriceSectionDetailCourse />
      </div>
    </section>
  );
}
