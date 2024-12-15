import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  ChartColumnIncreasing,
  GraduationCap,
  Star,
  UsersIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHeaderSectionDetailCourse = () => {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="w-3/4 h-16 lg:h-24 lg:mx-auto lg:w-1/2" />

      <div className="flex flex-col items-start w-full gap-2 lg:flex-row lg:justify-evenly text-text-primary">
        {/* Peserta */}
        <Skeleton className="w-full h-8 lg:w-48 lg:h-28" />

        {/* Level */}
        <Skeleton className="w-full h-8 lg:w-48 lg:h-28" />

        {/* Rating */}
        <Skeleton className="w-full h-8 lg:w-48 lg:h-28" />

        {/* Mentor */}
        <Skeleton className="w-full h-8 lg:w-48 lg:h-28" />
      </div>
    </div>
  );
};

export default SkeletonHeaderSectionDetailCourse;
