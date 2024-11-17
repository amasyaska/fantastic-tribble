import { UserType } from '@ctypes/user.types'
import { setProfile } from '@store/slices/profileSlice'
import { RootState } from '@store/store'
import { useDispatch, useSelector } from 'react-redux'

export const useProfile = () => {
	const profile = useSelector((state: RootState) => state.profile.value)
	const dispatch = useDispatch()

	return {
		profile,
		setProfile: (profile: UserType) => dispatch(setProfile(profile)),
	}
}
