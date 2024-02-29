import SimpleMap from '@/components/Map'
import Listview from '@/components/Listview'

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-full h-full flex">
        <SimpleMap />
        <Listview />
      </div>
    </div>
  )
}
