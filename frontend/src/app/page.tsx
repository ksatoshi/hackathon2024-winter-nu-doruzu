import SimpleMap from '@/components/Map'
import Listview from '@/components/Listview'

export default function Home() {
  return (
    <div className="h-screen w-screen flex  items-center justify-between">
      <SimpleMap />
      <Listview />
    </div>
  )
}
