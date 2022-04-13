import axios from 'axios'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import './App.css'

interface DataType {
  [key: string]: {
    [key: string]: string
  }
}

type SelectedType = 'case1' | 'case2'

function App() {
  const [data, setData] = useState<DataType | null>(null)
  const [selectedDataSet, setSelectedDataSet] = useState<SelectedType>('case1')
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

  const handleClick = (value: SelectedType) => {
    setSelectedDataSet(value)
    setCurrent(0)
    setDegree(0)
  }

  const handleRotate = () => {
    setDegree(degree + 90)
  }

  const handleChange = (current: any) => {
    setCurrent(current)
    setDegree(0)
  }

  const handleSort = (a: any, b: any) => {
    return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0])
  }

  return (
    <div className="App">
      <div style={{ margin: '50px' }}>
        {Object.keys(data)
          .sort(handleSort)
          .map((key) => (
            <button
              key={key}
              style={key === selectedDataSet ? { background: 'lightblue' } : {}}
              onClick={() => handleClick(key as SelectedType)}
            >
              {key}
            </button>
          ))}
      </div>

      <div className="content">
        <Carousel
          showArrows={true}
          onChange={(current) => handleChange(current)}
          selectedItem={current}
        >
          {Object.values(data[selectedDataSet]).map((item, index) => (
            <div key={item}>
              <img
                src={item}
                alt={item}
                style={
                  index === current
                    ? {
                        transform: `rotate(${degree}deg)`,
                        transition: `transform 500ms ease-in-out`,
                      }
                    : {}
                }
              />
            </div>
          ))}
        </Carousel>
        <button className="rotate_btn" onClick={handleRotate}>
          Rotate
        </button>
      </div>
    </div>
  )
}

export default App
