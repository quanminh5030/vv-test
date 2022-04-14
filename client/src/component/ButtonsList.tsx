import { DataType } from '../App'
import { formatTitle, handleSort } from '../utils/helper'

interface PropsType {
  data: DataType
  selectedDataSet: string
  handleClick: (value: string) => void
}

const ButtonsList = ({
  data,
  selectedDataSet,
  handleClick,
}: PropsType) => {
  return (
    <div style={{ margin: '50px' }}>
      {Object.keys(data)
        .sort(handleSort)
        .map((key) => (
          <button
            className='dataset_btn'
            key={key}
            style={key === selectedDataSet ? { background: 'lightblue' } : {}}
            onClick={() => handleClick(key)}
          >
            {formatTitle(key)}
          </button>
        ))}
    </div>
  )
}

export default ButtonsList
