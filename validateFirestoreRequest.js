export function validateFirestoreRequest(params) {
  if (!params.gsessionid || !params.SID) {
    throw new Error('Invalid session parameters');
  }
  if (!params.database) {
    throw new Error('Database parameter is required');
  }
}
