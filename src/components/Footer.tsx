import Image from "next/image";
import { Button } from "./ui";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/images/flags/DE.svg"
            alt="German Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          German
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/images/flags/ES.svg"
            alt="Spanish Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/images/flags/FR.svg"
            alt="France Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/images/flags/JP.svg"
            alt="Japan Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/images/flags/RU.svg"
            alt="Russia Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Russian
        </Button>
      </div>
    </footer>
  );
};
