import { monsserat } from "@/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const sitesAllowed = ["girls", "mens", "kids"];
  if (!sitesAllowed.includes(params.id)) notFound();

  return (
    <main>
      <h1 className={monsserat.className}>Category page</h1>
    </main>
  );
}
