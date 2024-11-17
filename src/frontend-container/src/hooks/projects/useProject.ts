import { projectService } from '@services/project.service'
import { useQuery } from '@tanstack/react-query'

type UseProjectsOptions = {
	companyId: number
}

export const useProjects = ({ companyId }: UseProjectsOptions) => {
	const {
		data,
		isPending: projectsIsLoading,
		isSuccess: projectsIsSuccess,
	} = useQuery({
		queryKey: [`get projects ${companyId}`],
		queryFn: () => projectService.getAll(companyId),
	})

	return {
		projects: data,
		projectsIsLoading,
		projectsIsSuccess,
	}
}
