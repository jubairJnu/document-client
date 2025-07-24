export default {
  api:
    process.env.NEXT_PUBLIC_NODE_MODULE === "development"
      ? process.env.NEXT_PUBLIC_API_URL_DEV
      : process.env.NEXT_PUBLIC_API_URL_DEV,
};
