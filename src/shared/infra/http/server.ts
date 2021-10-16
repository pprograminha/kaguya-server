import { app } from './app';

process.on('SIGTERM', () => {
  process.exit();
});

app.listen(3334, () => console.log('👾 Server started on port 3333'));
