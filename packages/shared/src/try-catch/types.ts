export interface TryCatchResult<T, S = Awaited<T | null>, F = Error | null> {
  data: S
  error: F
}
