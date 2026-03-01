/**
 * Dummy handler for testing purposes.
 */
export const handler = async (_event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "OK" }),
  };
};
