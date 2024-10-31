import { Text } from 'app/components/ui/text'
import { View } from 'app/components/ui/view'

import { useParams, useRouter, useSearchParams } from 'solito/navigation'


const useUserParams = useParams<{ id: string }>


function UserDetailScreen() {
  const { id } = useUserParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <View className='flex-1 bg-purple-400 items-center'>
      <Text className='font-bold text-white text-2xl' onPress={() => router.back()}>
        {id}, here is the search param: {searchParams?.get('search')}
      </Text>
    </View>
  )
}

export default UserDetailScreen
