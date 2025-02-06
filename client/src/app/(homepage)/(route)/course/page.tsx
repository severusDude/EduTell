import Blob from "../../_components/Blob";
import FilterCardCategory from "./_components/FilterCardCategory";
import ListCategory from "./_components/ListCategory";

export default function CoursePage() {
  return (
    <section className="relative mt-36">
      <Blob url="/image/blob-2.png" className="-left-16 -top-48" />
      <Blob url="/image/blob-1.png" className="-right-0 lg:-right-16 -top-32" />
      <div>
        <h1 className="text-3xl lg:text-5xl font-semibold text-center lg:w-[60%] mx-auto ">
          Temukan <span className="text-primary-color">Kursus</span> Yang Tepat
          Untuk <span className="text-primary-color">Anda</span>
        </h1>
      </div>
      <div className="px-4 mt-24 lg:px-0">
        <h1 className="text-xl font-semibold">Kategori Populer</h1>
        <div>
          <ListCategory />
        </div>
      </div>

      <div className="px-4 mt-24 lg:px-0">
        <h1 className="text-3xl font-semibold">Filter</h1>
        <FilterCardCategory />
      </div>
    </section>
  );
}
