import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/atoms/button';
import { ConfirmationDialog } from '@/components/ui/molecules/dialog';
import { useNotifications } from '@/components/ui/molecules/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteDiscussion } from '../api/delete-discussion';

type DeleteDiscussionProps = {
  id: string;
};

export const DeleteDiscussion = ({ id }: DeleteDiscussionProps) => {
  const { addNotification } = useNotifications();
  const deleteDiscussionMutation = useDeleteDiscussion({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion Deleted',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Discussion"
        body="Are you sure you want to delete this discussion?"
        triggerButton={
          <Button variant="destructive" icon={<Trash className="size-4" />}>
            Delete Discussion
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteDiscussionMutation.isPending}
            type="button"
            variant="destructive"
            onClick={() =>
              deleteDiscussionMutation.mutate({ discussionId: id })
            }
          >
            Delete Discussion
          </Button>
        }
      />
    </Authorization>
  );
};
