"use client";

import Loading from "@/components/Loading";
import { Preview } from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant/url";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Content = ({
  token,
  slugName,
  slugCourse,
}: {
  token: string;
  slugName: string;
  slugCourse: string;
}) => {
  const searchParams = useSearchParams();

  const chapter = searchParams.get("chapter");
  const subchapter = searchParams.get("subchapter");

  const { data: contentCourse, isLoading } = useQuery({
    queryKey: ["content-course", chapter, subchapter],
    queryFn: async () => {
      return await axios.get(
        `${BASE_URL}/courses/${slugCourse}/chapters/${chapter}/subchapters/${subchapter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  const { mutate: handleCompleted, isPending } = useMutation({
    mutationKey: ["content-course", chapter, subchapter],
    onSuccess: () => {
      toast.success("Subchapter diselesaikan");
    },
    mutationFn: async () => {
      return await axios.post(
        `${BASE_URL}/courses/${slugCourse}/chapters/${chapter}/subchapters/${subchapter}/mark-complete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  // console.log("data dari content ", contentCourse);
  // console.log("content ", contentCourse?.data?.content);

  const youtubeLinks = contentCourse?.data.data.attachments.filter(
    (item: any) => item?.file_name?.includes("https://www.youtu")
  );

  return (
    <div className="border-[0.3px] rounded-md p-4">
      {/* video */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <div>
              {youtubeLinks.length > 0 ? (
                <YouTubeEmbed url={youtubeLinks[0]?.file_name} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {contentCourse?.data.data.title}
              </h3>
              {/* <Button variant={"link"} onClick={() => handleCompleted()}>
                {isPending && <Loader2 className="animate-spin" />}
                Selesai
              </Button> */}
            </div>
            <Preview value={contentCourse?.data?.data.content} />
          </div>
        </>
      )}
    </div>
  );
};

export default Content;

const YouTubeEmbed = ({ url }: { url: string }) => {
  // Extract the video ID from the URL
  const getYouTubeId = (url: string) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:\?v=|\/embed\/|\/watch\?v=|\/)([\w\-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null; // Return the video ID or null
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return <p>Invalid YouTube URL</p>; // Fallback for invalid URLs
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="w-full">
      <iframe
        className="w-full"
        width="800"
        height="470"
        src={embedUrl}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
