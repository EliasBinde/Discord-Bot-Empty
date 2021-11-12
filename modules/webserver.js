run_server = () => {
    const express = require('express');
    const path = require('path');
    require('dotenv').config();
    const app = express();

    app.get('/', (req, res) => {
        res.sendFile('index.html', {root: './views'})
        
    })

    const PORT = process.env.PORT || 8080

    app.listen(PORT, _ => {
        console.log(`App deployed at Port ${PORT}`)
    })
} 

module.exports = run_server;