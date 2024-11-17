import { CreateProjectDialog } from '@components/projects/dialogs/create/CreateProjectDialog'
import {
	ProjectItem,
	ProjectItemSkeleton,
} from '@components/projects/item/ProjectItem'
import { Button } from '@components/ui/button/Button'
import { Skeleton } from '@components/ui/skeleton/Skeleton'
import { ROUTES } from '@configs/routes.config'
import { useCompanySelect } from '@hooks/company/useCompanySelect'
import { useProjects } from '@hooks/projects/useProject'
import { LuSettings } from 'react-icons/lu'
import { Link } from 'react-router-dom'

type CompanyProjectsPageProps = {}

export const CompanyProjectsPage = ({}: CompanyProjectsPageProps) => {
	const { selectedCompany, selectedCompanyId } = useCompanySelect()
	const { projects, projectsIsLoading } = useProjects({
		companyId: Number(selectedCompanyId),
	})

	return (
		<div className='p-4 flex flex-col gap-3'>
			{!projectsIsLoading ? (
				<h2>
					{selectedCompany?.name} projects ({projects?.length})
				</h2>
			) : (
				<Skeleton className='w-[15rem] h-[2rem]' />
			)}
			<div className='flex gap-2'>
				<CreateProjectDialog companyId={Number(selectedCompanyId)} />
				<Button variant='secondary' asChild withOneChild>
					<Link to={ROUTES.COMPANIES.MANAGE}>
						<LuSettings />
						Manage companies
					</Link>
				</Button>
			</div>
			<div className='flex gap-3 flex-wrap'>
				{projectsIsLoading &&
					[0, 1, 2].map((_, index) => <ProjectItemSkeleton key={index} />)}

				{projects?.map((item, index) => (
					<ProjectItem {...item} key={index} />
				))}

				{projects?.length === 0 && (
					<span className='text-zinc-500'>No projects found</span>
				)}
			</div>
		</div>
	)
}
