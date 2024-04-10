let abortController: AbortController;

export default function fetcher(url: string, method: string = "GET", body: any = null) {
  if (typeof url !== "string" || !url) {
    throw new Error("Invalid URL param.");
  }

  /**
   * Check if environment is production because in development always does 2 renders...
   */

  if (
    process.env.NODE_ENV !== "development" &&
    abortController
  ) {
    abortController.abort();
  }

  abortController = new AbortController();

  return fetch(url, {
    body,
    method,
    signal: abortController.signal,
  });
}