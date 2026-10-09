import Image from "next/image";

import bg from "@/public/wallpapers/moonbackground.jpg";

const DesktopBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Image src={bg} alt="bg" fill priority className="object-cover" />
    </div>
  );
};

export default DesktopBackground;
