"use client";

import React, { useEffect } from "react";
import ButtonBack from "@/components/ButtonBack";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constant/url";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Loading from "@/components/Loading";
import InputSubchapter from "./InputSubchapter";
import InputDescriptionSubChapter from "./InputDescriptionSubChapter";
import InputTitleSubChapter from "./InputTitleSubChapter";
import InputContentSubChapter from "./InputContentSubChapter";
import InputLinkVideoSubChapter from "./InputLinkVideoSubChapter";
import InputFileSubChapter from "./InputFileSubChapter";

const WrappingEditSubChapter = ({
  courseId,
  token,
  teacherSlug,
  chapterPosition,
  subchapterPosition,
}: {
  courseId: string;
  token: string;
  teacherSlug: string;
  chapterPosition: string;
  subchapterPosition: string;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [linkVideo, setLinkVideo] = useState<string>("");
  const [attacmentVideo, setAttacmentVideo] = useState<any[]>([]);
  const [attacmentFile, setAttacmentFile] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<number>(0);

  const router = useRouter();

  const { data: initialDataChapter, isLoading } = useQuery({
    queryKey: ["get-chapter-position"],
    queryFn: async () => {
      return (
        await axios.get(
          `${BASE_URL}/courses/${courseId}/chapters/${chapterPosition}/subchapters/${subchapterPosition}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      ).data;
    },
  });

  useEffect(() => {
    if (initialDataChapter?.data) {
      console.log("BEJIER DATA", initialDataChapter?.data);
      setTitle(initialDataChapter?.data.title);
      setDescription(initialDataChapter?.data.description);
      setContent(initialDataChapter?.data.content);
      if (initialDataChapter?.data.attachments) {
        const youtubeLinks = initialDataChapter?.data.attachments.filter((item: any) =>
          item?.file_name?.includes("https://www.youtu")
        );

        const attachments = initialDataChapter?.data.attachments.filter((item: any) =>
          !item?.file_name?.includes("https://www.youtu")
        );
    
        setAttacmentVideo([...youtubeLinks]);
        setAttacmentFile([...attachments]);
      }
      setPosition(Number(chapterPosition));
    }
  }, [initialDataChapter]);

  console.log("SUBCHAPER ", attacmentVideo);

  const {
    mutate: handleUpdate,
    data,
    isPending,
  } = useMutation({
    mutationKey: ["update-subchapter"],
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Subchapter");
      router.push(
        `/teacher/dashboard/${teacherSlug}/${courseId}/edit-chapter/${chapterPosition}`
      );
    },
    onError: () => {
      toast.error("Gagal Mengupdate Subchapter");
    },
    mutationFn: async () => {
      const formData = new FormData();

      console.log("ini file ", file);

      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("is_published", "true");
      formData.append("position", subchapterPosition);
      if (linkVideo) {
        formData.append("video", linkVideo);
      }
      if (file) {
        formData.append("attachments[]", file);
      }

      return await axios.post(
        `${BASE_URL}/courses/${courseId}/chapters/${chapterPosition}/subchapters/${subchapterPosition}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  });

  return (
    <div className="border-[0.3px] p-4 rounded-md">
      <div className="flex items-center justify-between">
        <ButtonBack />
        <Button
          onClick={() => handleUpdate()}
          disabled={isPending}
          className="transition-all ease-in-out bg-primary-color hover:bg-primary-color/80"
        >
          {isPending && <Loader2 className="animate-spin" />}
          Simpan
        </Button>
      </div>
      <div className="mt-2 space-y-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h3 className="text-xl font-semibold">Kelola Subchapter</h3>
            <InputTitleSubChapter title={title} setTitle={setTitle} />
            <InputDescriptionSubChapter
              description={description}
              setDescription={setDescription}
            />

            <InputContentSubChapter
              description={content}
              setDescription={setContent}
            />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 ">
              <InputLinkVideoSubChapter
                setAttacmentVideo={setAttacmentVideo}
                attacmentVideo={attacmentVideo}
                setTitle={setLinkVideo}
                title={linkVideo}
              />
              <InputFileSubChapter attacment={attacmentFile} file={file} setFile={setFile} />
            </div>
            <h1>EDIT SUBCHAPTER</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default WrappingEditSubChapter;
