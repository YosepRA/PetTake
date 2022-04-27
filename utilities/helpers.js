async function promiseResolver(promise) {
  try {
    const result = await promise;

    return [result, null];
  } catch (error) {
    return [null, error];
  }
}

module.exports = { promiseResolver };
