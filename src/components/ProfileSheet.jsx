import { Button } from '@/components/ui/button';
import {
	Sheet,
	// SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import ProfileForm from './ProfileForm';

export default function ProfileSheet() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size='sm' variant='ghost' className='flex gap-1 md:px-8'>
					<img className='w-5 h-5' src='/src/assets/profile.svg' alt='' />
					<span className='sm:flex hidden'>Profile</span>
				</Button>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you are done.
					</SheetDescription>
				</SheetHeader>

				<ProfileForm />

				<SheetFooter></SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

/**
 * <SheetClose asChild>
 */
