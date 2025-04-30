const upgrades = [
  {
    id: 1,
    name: "Click Accelerator",
    description: "speed of earning x10",
    price: 40000
  }
];

let nextId = 2;

app.get('/upgrades', (req, res) => {
  res.status(200).json(upgrades);
});

app.get('/upgrades/:id', (req, res) => {
  const upgrade = upgrades.find(u => u.id === +req.params.id);
  if (!upgrade) return res.status(404).json({ error: "Апгрейд не знайдено" });
  res.status(200).json(upgrade);
});

app.post('/upgrades', (req, res) => {
  const { id, name, description, price } = req.body;
  if (id !== undefined) {
    return res.status(409).json({ error: 'ID встановлюється автоматично' });
  }
  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof description !== 'string' || description.trim() === '' ||
    typeof price !== 'number' || price < 0
  ) {
    return res.status(400).json({ error: 'Некоректні дані' });
  }
  const newUpgrade = {
    id: nextId++,
    name: name.trim(),
    description: description.trim(),
    price
  };

  upgrades.push(newUpgrade);
  res.status(201).json(newUpgrade);
});
app.put('/upgrades/:id', (req, res) => {
  const upgrade = upgrades.find(u => u.id === +req.params.id);
  if (!upgrade) return res.status(404).json({ error: 'Апгрейд не знайдено' });

  const { name, description, price } = req.body;

  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof description !== 'string' || description.trim() === '' ||
    typeof price !== 'number' || price < 0
  ) {
    return res.status(400).json({ error: 'Некоректні дані' });
  }

  upgrade.name = name.trim();
  upgrade.description = description.trim();
  upgrade.price = price;

  res.status(200).json(upgrade);
});

app.delete('/upgrades/:id', (req, res) => {
  const index = upgrades.findIndex(u => u.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Апгрейд не знайдено' });

  upgrades.splice(index, 1);
  res.status(204).send();
});
app.listen(PORT, () => {
  console.log(`✅ Сервер працює на http://localhost:${PORT}`);
});
