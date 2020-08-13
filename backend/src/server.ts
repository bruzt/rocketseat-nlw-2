import app from './app';

app.listen(process.env.PORT || 3001, () => console.log(`running on port ${process.env.PORT || 3001}`));
