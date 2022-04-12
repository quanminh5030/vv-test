import axios from 'axios'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import './App.css'

interface DataType {
  case1: {
    one: string
    two: string
    three: string
  }
  case2: {
    zero: string
    one: string
    two: string
    three: string
  }
}

type SelectedType = 'case1' | 'case2'

function App() {
  const [data, setData] = useState<DataType | null>(null)
  const [selected, setSelected] = useState<SelectedType>('case1')
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
    setSelected(value)
    setCurrent(0)
  }

  const handleRotate = () => {
    setDegree(degree + 90)
  }

  const handleChange = (current: any) => {
    setCurrent(current)
  }

  return (
    <div className="App">
      <div style={{ margin: '50px' }}>
        {Object.keys(data).map((key) => (
          <button
            key={key}
            style={key === selected ? { background: 'lightblue' } : {}}
            onClick={() => handleClick(key as SelectedType)}
          >
            {key}
          </button>
        ))}
      </div>

      <div style={{ width: '70%', margin: 'auto' }}>
        <Carousel
          showArrows={true}
          onChange={(current) => handleChange(current)}
        >
          {Object.values(data[selected]).map((item, index) => (
            <div key={item}>
              <img
                src={item}
                alt={item}
                style={
                  index === current ? { transform: `rotate(${degree}deg)` } : {}
                }
              />
            </div>
          ))}
        </Carousel>
        <button onClick={handleRotate}>Rotate</button>
      </div>
    </div>
  )
}

export default App
