import axios from 'axios'
import { useEffect, useState } from 'react'

import './App.css'
import ButtonsList from './component/ButtonsList'
import ImagesList from './component/ImagesList'

export interface DataType {
  [key: string]: {
    [key: string]: string
  }
}

function App() {
  const [data, setData] = useState<DataType | null>(null)
  const [selectedDataSet, setSelectedDataSet] = useState('case-1')
  const [degree, setDegree] = useState(0)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    axios
      .get('http://localhost:3001/all')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, [])

  if (!data) {
    return null
  }

  const handleClick = (value: string) => {
    setSelectedDataSet(value)
    setCurrent(0)
    setDegree(0)
  }

  const handleRotate = () => {
    setDegree(degree + 90)
  }

  const handleChange = (current: number) => {
    setCurrent(current)
    setDegree(0)
  }

  return (
    <div className="App">
      <h1>VV-TEST</h1>

      <ButtonsList
        data={data}
        selectedDataSet={selectedDataSet}
        handleClick={handleClick}
      />

      <ImagesList
        data={data}
        current={current}
        degree={degree}
        handleChange={handleChange}
        selectedDataSet={selectedDataSet}
        handleRotate={handleRotate}
      />
    </div>
  )
}

export default App
