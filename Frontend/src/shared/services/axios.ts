import { createApiClient } from '../lib/axios/create-api-client'

// Shared axios client for the whole frontend.
// Features import this one instance so auth cookies and base config stay consistent.
export default createApiClient()
