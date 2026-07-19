const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** На поддомене — корень; пока живём как раздел: https://biznes-ip.ru/memory/ */
export const SITE_URL = basePath
  ? `https://biznes-ip.ru${basePath}`
  : "https://memory.biznes-ip.ru";

export const SITE_NAME = "Память10";
export const SISTER_SITE_URL = "https://biznes-ip.ru";
export const SISTER_SITE_NAME = "СчётИП";
