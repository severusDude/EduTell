import CardCourse from '@/components/CardCourse'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import React from 'react'

const CourseList = () => {
  return (
    <section className="mt-24 lg:block">
        <h1 className="text-5xl font-semibold w-[80%] mx-auto text-center">
          Temukan <span className="text-primary-color">Kursus</span> yang Tepat
          untuk <span className="text-primary-color">Anda</span>
        </h1>

        <div className="grid grid-cols-1 gap-16 px-4 mt-12 lg:grid-cols-3 lg:px-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardCourse key={index} />
          ))}
        </div>
        <div className="w-full mt-12">
          <Button className="flex items-center gap-3 px-8 mx-auto bg-primary-color hover:bg-primary-color/80">
            Lihat Course Lainnya <ChevronRightIcon />
          </Button>
        </div>
      </section>
  )
}

export default CourseList