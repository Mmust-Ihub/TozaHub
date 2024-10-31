(async () => {
    await Promise.all([
      import('./server.js'),
      import('./worker.js')
    ]);
  })();
