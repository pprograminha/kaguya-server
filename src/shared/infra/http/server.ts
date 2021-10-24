import { app } from './app';

process.on('SIGTERM', () => {
  process.exit();
});

app.listen(3333, () => console.log('👾 Server started on port 3333'));
