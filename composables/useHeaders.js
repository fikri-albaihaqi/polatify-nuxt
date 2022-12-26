export const useHeaders = async () => {
  const supabase = useSupabaseAuthClient()
  
  const { data: { session }, } = await supabase.auth.getSession()
  const provider_token = session?.provider_token

  const headers = {
    Authorization: `Bearer ${provider_token}`,
    'Content-type': 'application/json',
  }

  return headers
}