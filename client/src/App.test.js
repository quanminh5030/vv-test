/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */

import '@testing-library/jest-dom/extend-expect'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import ButtonsList from './component/ButtonsList'
import ImagesList from './component/ImagesList'

const testData = {
  "case-1": {
    one: 'http://localhost:3001/static/case-1/1.png',
    two: 'http://localhost:3001/static/case-1/1.png'
  },
  "case-2": {
    zero: 'http://localhost:3001/static/case-2/0.png',
    one: 'http://localhost:3001/static/case-2/1.png'
  }
}

let selectedDataSet = Object.keys(testData)[0]

describe('first renders App', () => {
  test('render App always shows title', () => {
    render(<App />)
    const element = screen.getByText('VV-TEST')
    expect(element).toBeDefined()
  })

  test('without data from backend, the loading icon shows', () => {
    const { container } = render(<App />)

    const loadingIcon = container.querySelector('.loading')
    expect(loadingIcon).toBeDefined()

    const datasetBtn = container.querySelector('.dataset_btn')
    expect(datasetBtn).toBeNull()
  })
})

describe('renders buttons list', () => {

  test('number of buttons equal to number of datasets, in which the first one is selected by default', () => {

    const { container } = render(<ButtonsList
      data={testData}
      selectedDataSet={Object.keys(testData)[0]}
    />)

    // 2 buttons existed
    const datasetBtn = container.getElementsByClassName('dataset_btn')
    const numberOfDataSet = Object.keys(testData).length

    expect(datasetBtn.length).toBe(numberOfDataSet)

    // first button is selected, others not
    const firstButton = screen.getByText('Case 1')
    expect(firstButton).toHaveStyle('background: lightblue')

    const secondButton = screen.getByText('Case 2')
    expect(secondButton).not.toHaveStyle('background: lightblue')
  })
})

describe('render datasets', () => {

  test("in the beginning, first image of first dataset is displayed in main, others not", () => {
    const { container } = render(<ImagesList
      data={testData}
      selectedDataSet={selectedDataSet}
    />)

    const displayImg = container.querySelector('.main_img')

    const image1 = within(displayImg).queryByAltText('1.png')
    expect(image1).toBeInTheDocument()

    const image2 = within(displayImg).queryByAltText('2.png')
    expect(image2).toBeNull()
  })

  test('click the button change the selected dataset', async () => {
    // first renders
    const handleClickMock = jest.fn(() => selectedDataSet = Object.keys(testData)[1])

    const { rerender } = render(<ButtonsList
      data={testData}
      selectedDataSet={selectedDataSet}
      handleClick={handleClickMock}
    />)
  
    const case2_btn = screen.getByText('Case 2')
    expect(case2_btn).not.toHaveStyle('background: lightblue')

    // Click the button to change the dataset
    await userEvent.click(case2_btn)

    // rerender after button is clicked
    rerender(<ButtonsList
      data={testData}
      selectedDataSet={selectedDataSet}
      handleClick={handleClickMock}
    />)

    expect(handleClickMock.mock.calls).toHaveLength(1)
    expect(case2_btn).toHaveStyle('background: lightblue') // selected button is changed now

    const { container } = render(<ImagesList
      data={testData}
      selectedDataSet={selectedDataSet}
    />)

    // the images of the first dataset are no longer displayed
    const displayImg = container.querySelector('.main_img')

    const image1_case1 = within(displayImg).queryByAltText('1.png')
    expect(image1_case1).toBeNull()

    // instead the first image of the second dataset is showed up
    const image0_case2 = within(displayImg).queryByAltText('0.png')
    expect(image0_case2).toBeInTheDocument()
  })
})








