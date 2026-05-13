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
