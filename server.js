const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/update-json', (req, res) => {
    const newData = req.body;

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Eroare la citirea fișierului:', err);
            return res.status(500).json({ message: 'Eroare la citirea fișierului' });
        }

        let jsonData = JSON.parse(data);
        jsonData = { ...jsonData, ...newData };

        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Eroare la scrierea fișierului:', err);
                return res.status(500).json({ message: 'Eroare la scrierea fișierului' });
            }

            res.json({ message: 'Datele au fost actualizate cu succes' });
        });
    });
});

app.post('/reset-json', (req, res) => {
    const initialData = [];

    fs.writeFile('data.json', JSON.stringify(initialData, null, 2), (err) => {
        if (err) {
            console.error('Eroare la resetarea fișierului:', err);
            return res.status(500).json({ message: 'Eroare la resetarea fișierului' });
        }

        res.json({ message: 'Fișierul JSON a fost resetat cu succes' });
    });
});

app.listen(PORT, () => {
    console.log(`Serverul rulează la http://localhost:${PORT}`);
});
