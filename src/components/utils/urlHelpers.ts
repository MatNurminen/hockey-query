export const updateSearchParams = (
  searchParams: URLSearchParams,
  updates?: Record<string, string | number | null>,
  options?: { keepTab?: boolean; keepSeason?: boolean },
): URLSearchParams => {
  const newParams = new URLSearchParams(searchParams);

  if (updates) {
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
  }

  if (options?.keepTab !== false) {
    const currentTab = searchParams.get("tab");
    if (currentTab) {
      newParams.set("tab", currentTab);
    }
  }

  if (options?.keepSeason) {
    const currentSeason = searchParams.get("season");
    if (currentSeason) {
      newParams.set("season", currentSeason);
    }
  }

  return newParams;
};

export const navigateWithParams = (
  navigate: (path: string) => void,
  searchParams: URLSearchParams,
  updates?: Record<string, string | number | null>,
  options?: { keepTab?: boolean; keepSeason?: boolean },
) => {
  const newParams = updateSearchParams(searchParams, updates, options);
  navigate(`?${newParams.toString()}`);
};

export const getKeyFromLogo = (logo: string): string => {
  try {
    if (logo.startsWith("http://") || logo.startsWith("https://")) {
      const u = new URL(logo);
      const p = u.pathname.startsWith("/") ? u.pathname.slice(1) : u.pathname;
      return p;
    }
    return logo.startsWith("/") ? logo.slice(1) : logo;
  } catch {
    return logo.replace(/^\//, "");
  }
};

export const deleteParams = (
  searchParams: URLSearchParams,
  keys: string[],
  options?: { keepTab?: boolean; keepSeason?: boolean },
): URLSearchParams => {
  const newParams = new URLSearchParams(searchParams);

  keys.forEach((key) => {
    newParams.delete(key);
  });

  if (options?.keepTab !== false) {
    const currentTab = searchParams.get("tab");
    if (currentTab) {
      newParams.set("tab", currentTab);
    }
  }

  if (options?.keepSeason) {
    const currentSeason = searchParams.get("season");
    if (currentSeason) {
      newParams.set("season", currentSeason);
    }
  }

  return newParams;
};
