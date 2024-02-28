import SimpleMap from "@/components/Map";
import Listview from "@/components/Listview";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex w-full h-full">
          <SimpleMap />
          <Listview/>
      </div>
    </div>
  );
}
