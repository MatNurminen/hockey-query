export const waitForImageAvailable = async (
  url: string,
  timeout = 10000,
  interval = 500
): Promise<void> => {
  const startTime = Date.now();

  return new Promise<void>((resolve, reject) => {
    const check = () => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => {
        if (Date.now() - startTime > timeout) {
          reject(
            new Error(`Image at ${url} did not become available in time.`)
          );
        } else {
          setTimeout(check, interval);
        }
      };
      img.src = `${url}?_=${Date.now()}`;
    };
    check();
  });
};
