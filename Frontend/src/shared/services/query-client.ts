import { QueryClient, type DefaultOptions } from '@tanstack/react-query'

export const queryClientDefaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false
  }
}

// One shared query client keeps cache behavior same across all features.
export const createQueryClient = () => new QueryClient({
  defaultOptions: queryClientDefaultOptions
})

export const queryClient = createQueryClient()
