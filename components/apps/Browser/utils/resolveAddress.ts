const resolveAddress = (input: string): string | null => {
  const value = input.trim();

  if (!value) return null;

  // If a protocol is present, only accept HTTP or HTTPS.
  const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(value);

  if (hasProtocol && !/^https?:\/\//i.test(value)) {
    return null;
  }

  // Recognize URLs, domains, localhost, and IP addresses.
  const isWebsite =
    /^https?:\/\//i.test(value) ||
    /^(localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[\w-]+\.)+[\w-]+)(:\d+)?(?:[/?#].*)?$/i.test(
      value,
    );

  const destination = isWebsite
    ? /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`
    : `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(value)}`;

  try {
    const url = new URL(destination);

    if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
};

export default resolveAddress;
