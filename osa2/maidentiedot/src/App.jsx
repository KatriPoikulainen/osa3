import { useState, useEffect } from 'react'
import maatService from './services/maat'
import Filter from './components/Filter'
import Maat from './components/Maat'

const App = () => {
  const [maat, setMaat] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    maatService.getAll().then(data => setMaat(data))
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const maatToShow = maat.filter(m =>
    m.name.common.toLowerCase().includes(filter.toLowerCase()))

    const showMaa = (name) => {
      setFilter(name)
    }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      {filter.trim() === '' ? null : (<Maat maat={maatToShow} onShow={showMaa}/>)}
    </div>
  )
}

export default App
