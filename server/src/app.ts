import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('be works')
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
