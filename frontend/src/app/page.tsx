import SimpleMap from "@/components/Map";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full h-full">
        <SearchInput />
        <SimpleMap />
      </div>
    </div>
  );
}
