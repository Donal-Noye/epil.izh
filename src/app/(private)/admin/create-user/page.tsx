import {CreateUserForm} from "@/features/admin/create-user-form";

export default function AdminCreateUserPage() {
	return (
		<div className="flex flex-col items-center">
			<CreateUserForm className="max-w-xl w-full" />
		</div>
	)
}