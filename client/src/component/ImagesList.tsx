import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { DataType } from '../App'

export interface PropsType {
  data: DataType
  current: number
  degree: number
  selectedDataSet: string
  handleChange: (current: number) => void
  handleRotate: () => void
}

const ImagesList = ({
  data,
  current,
  degree,
  selectedDataSet,
  handleChange,
  handleRotate,
}: PropsType) => {
  return (
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
  )
}

export default ImagesList
