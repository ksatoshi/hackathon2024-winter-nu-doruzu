import SimpleMap from '@/components/Map'
import SearchInput from '@/components/SearchInput'
import Listview from '@/components/Listview'

export default function Home() {
  return (

    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <SearchInput />
      <div className="w-full h-full flex">
        <SimpleMap />
        <Listview />
      </div>
    </div>
  )
}
