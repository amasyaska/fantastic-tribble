import { UserType } from '@ctypes/user.types'
import { getUserId, setUserId } from '@lib/cookieTokens'
import { toCamelCase } from '@lib/typeConverter'
import { userService } from '@services/user.service'
import { setIsLoading, setProfile } from '@store/slices/profileSlice'
import { RootState } from '@store/store'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useProfile = () => {
	const queryClient = useQueryClient()
	const { value: profile, isLoading } = useSelector(
		(state: RootState) => state.profile
	)
	const dispatch = useDispatch()

	const { data, isPending: profileIsLoading } = useQuery({
		queryKey: ['get user profile'],
		queryFn: () => {
			dispatch(setIsLoading(true))
			return userService.getProfile(getUserId()!)
		},
		enabled: () => !isLoading && getUserId() != null,
	})

	const updateProfileFromServerWithId = useCallback(
		(userId: number) => {
			setUserId(userId)
			dispatch(setIsLoading(false))
			queryClient.invalidateQueries({ queryKey: ['get user profile'] })
		},
		[queryClient]
	)

	useEffect(() => {
		if (!data) return

		dispatch(setProfile(toCamelCase(data.data) as UserType))
	}, [data])

	return {
		profile,
		profileIsLoading,
		setProfile: (profile: UserType) => dispatch(setProfile(profile)),
		updateProfileFromServerWithId,
	}
}
