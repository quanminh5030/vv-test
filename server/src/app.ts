import express from 'express'
import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import cors from 'cors'
import _ from 'lodash'

import { DataType } from './type'

const app = express()
app.use('/static', express.static('data'))
app.use(cors())

app.get('/all', (req, res) => {
  try {
    const filename = path.join(__dirname, 'data.yml')
    const data = yaml.load(fs.readFileSync(filename, 'utf-8')) as DataType

    const updatePath = 'http://localhost:3001/static'

    Object.keys(data).map(key => {
      Object.keys(data[key]).map(item => {
        _.update(data[key], item, (n) => updatePath + n)
      })
    })

    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
