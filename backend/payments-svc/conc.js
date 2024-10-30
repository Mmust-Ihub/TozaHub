(async () => {
    await Promise.all([
      import('./worker.js')
      import('./server.js'),
    ]);
  })();
