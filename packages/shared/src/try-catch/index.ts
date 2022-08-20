import type { TryCatchResult } from './types'

export const tryCatch = async <T>(
  promise: () => Promise<T>,
  onError?: (error: unknown) => void,
  onResult?: (data: T) => void,
): Promise<TryCatchResult<T>> => {
  try {
    const data = await promise()

    onResult?.(data)

    return {
      data,
      error: null,
    }
  }
  catch (error) {
    onError?.(error)

    return {
      data: null,
      error: error instanceof Error ? error : null,
    }
  }
}
