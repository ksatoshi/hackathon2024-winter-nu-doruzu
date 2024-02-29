import SimpleMap from '@/components/Map'
import SearchInput from '@/components/SearchInput'
import Listview from '@/components/Listview'

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col ">
      <SearchInput />
      <div className="w-full h-full flex">
        <SimpleMap />
        <Listview />
      </div>
    </div>
  )
}
