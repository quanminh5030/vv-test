import axios from 'axios'
import { useEffect, useState } from 'react'

import ButtonsList from './component/ButtonsList'
import ImagesList from './component/ImagesList'
import './App.css'
import NotFound from './component/Loading'

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
      <h1> VV-TEST</h1>
      {data ? (
        <>
          <ButtonsList
            data={data}
            selectedDataSet={selectedDataSet}
            handleClick={handleClick}
          />
          <ImagesList
            data={data}
            current={current}
            selectedDataSet={selectedDataSet}
            degree={degree}
            handleChange={handleChange}
            handleRotate={handleRotate}
          />
        </>
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default App
