import Image from "next/image";
import React from "react";

const CardReview = () => {
  return (
    <div className="min-w-[400px] rounded-md shadow-xl p-6 space-y-8 h-[295px]">
      <div className="flex items-center gap-2">
        <Image
          src={"/image/profile-placeholder.png"}
          alt="profile-image"
          width={50}
          height={50}
        />
        <p className="text-xl font-semibold">Rina</p>
      </div>
      <p className="text-xl font-semibold">
        “Saya berhasil membuat website pertama saya setelah mengikuti kursus
        ini. Terima kasih atas panduannya yang sangat detail!”
      </p>
    </div>
  );
};

export default CardReview;
