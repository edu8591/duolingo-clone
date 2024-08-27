import { Header } from "@/components";

type MarketinLayoutProps = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: MarketinLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
