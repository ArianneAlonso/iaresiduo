const express = require('express');
const cors = require('cors');
const os = require('os');

const userRoutes = require('./src/routes/userroutes.js');
const eventRoutes = require('./src/routes/eventroutes.js');
const imagesRouter = require('./gemini/controllers.js');
const containerRoutes = require('./src/routes/containerroutes.js');
const pickupRoutes = require('./src/routes/pickuproutes.js');
const authRoutes = require('./src/routes/authroutes.js');


const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/gemini', imagesRouter);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/containers', containerRoutes);
app.use('/api/auth', authRoutes);

function getLocalIp() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return 'localhost';
}

app.get('/', (req, res) => {
  res.json({ message: 'Backend Mobile funcionando' });
});

const PORT = 8000;

app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIp();

  console.log('Servidor corriendo en:');
  console.log(`http://localhost:${PORT}`);
  console.log(`http://${ip}:${PORT}`);

});