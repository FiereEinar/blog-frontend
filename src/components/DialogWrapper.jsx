import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

export default function DialogWrapper({
	trigger,
	children,
	title,
	description,
	customConfirmText = 'Confirm',
	confirmBtnVariant,
	onConfirm,
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<div className='flex items-center space-x-2'>{children}</div>

				<DialogFooter className='sm:justify-start'>
					<div className='w-full flex gap-2 justify-end'>
						<DialogClose asChild>
							<Button size='sm' type='button' variant='secondary'>
								Close
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								onClick={onConfirm}
								size='sm'
								type='button'
								variant={confirmBtnVariant}
							>
								{customConfirmText}
							</Button>
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
