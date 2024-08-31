import Image from "next/image";

export const Brand = () => {
  return (
    <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
      <Image src="/images/mascot.svg" height={40} width={40} alt="mascot" />
      <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
        Lingo
      </h1>
    </div>
  );
};
