import { useLocalePath } from '#imports'
import { useSession } from '~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (!to.name?.toString().startsWith('dashboard')) {
    return
  }

  const { data: session } = await useSession(useFetch)
  if (!session.value) {
    const localePath = useLocalePath()
    return navigateTo(localePath('sign-in'))
  }
})
