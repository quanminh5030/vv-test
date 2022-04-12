import express from 'express'
import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import cors from 'cors'
import _ from 'lodash'

const app = express()
app.use('/static', express.static('data'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('be works')
})

app.get('/all', (req, res) => {
  try {
    const filename = path.join(__dirname, 'data.yml')
    const data: any = yaml.load(fs.readFileSync(filename, 'utf-8'))

    const updatePath = 'http://localhost:3001/static'

    const case1 = data.case1
    const case2 = data.case2

    Object.keys(case1).map((key) => {
      _.update(case1, key, function (n) {
        return updatePath + n
      })
    })

    Object.keys(case2).map((key) => {
      _.update(case2, key, function (n) {
        return updatePath + n
      })
    })

    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
