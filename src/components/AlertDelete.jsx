import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react'

export const AlertDelete = ({ isOpen, onClose, event, deleteEvent }) => {
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete {event.title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can&apos;t undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteEvent} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}