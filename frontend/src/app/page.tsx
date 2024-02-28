import SimpleMap from "@/components/Map";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full h-full">
        <SimpleMap />
      </div>
    </div>
  );
}
