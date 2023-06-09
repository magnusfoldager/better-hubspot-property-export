var express = require('express')
var cors = require('cors')
var app = express()

const PORT = process.env.PORT || 3030

const hubspot = require('@hubspot/api-client')

var corsOptions = {
	origin: 'https://magnusfoldager.github.io',
	optionsSuccessStatus: 200
}
app.use(cors())

app.get('/', (req, res) => {
	res.status(200).json({ status: 'ok' })
})

app.get('/properties', cors(corsOptions), async (req, res) => {
	if (req && req.query && req.query.accessToken && req.query.object && req.query.archived) {
		const hubspotClient = new hubspot.Client({ accessToken: req.query.accessToken })
		const objectType = req.query.object
		const archived = req.query.archived

		try {
			const apiResponse = await hubspotClient.crm.properties.coreApi.getAll(objectType, archived, undefined)
            const results = apiResponse.results
			res.status(200).json( results )
		} catch (e) {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	} else res.status(406).json({ error: 'Not Accepted' })
})

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' })
})

app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}`)
})
