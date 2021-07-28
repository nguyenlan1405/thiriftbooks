const { get } = lodash;
export const TEXT_DOMAIN = "editor_plus";
export const proxy = get(eplus_data, "rest_url");
export const restProxy = proxy.concat("wp/v2/");
