import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { DataType } from '../App'
import { getImageName } from '../utils/helper'

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

  const imgList = Object.values(data[selectedDataSet])

  return (
    <div className="content">
      <Carousel
        showArrows={true}
        onChange={(current) => handleChange(current)}
        selectedItem={current}
      >
        {imgList.map((item, index) => {
          return (
            <div key={item} className='main_img'>
              <img
                src={item}
                alt={getImageName(item)}
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
          )
        })}
      </Carousel>
      <button className="rotate_btn" onClick={handleRotate}>
        Rotate
      </button>
    </div>
  )
}

export default ImagesList
