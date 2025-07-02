import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/atoms/button';
import { useNotifications } from '@/components/ui/molecules/notifications';

import {
  createCommentInputSchema,
  useCreateComment,
} from '../api/create-comment';
import { Form, FormDrawer } from '@/components/ui/molecules/form';
import { Textarea } from '@/components/ui/atoms/textarea';

type CreateCommentProps = {
  discussionId: string;
};

export const CreateComment = ({ discussionId }: CreateCommentProps) => {
  const { addNotification } = useNotifications();
  const createCommentMutation = useCreateComment({
    discussionId,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Comment Created',
        });
      },
    },
  });

  return (
    <FormDrawer
      isDone={createCommentMutation.isSuccess}
      triggerButton={
        <Button size="sm" icon={<Plus className="size-4" />}>
          Create Comment
        </Button>
      }
      title="Create Comment"
      submitButton={
        <Button
          isLoading={createCommentMutation.isPending}
          form="create-comment"
          type="submit"
          size="sm"
          disabled={createCommentMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="create-comment"
        onSubmit={(values) => {
          createCommentMutation.mutate({
            data: values,
          });
        }}
        schema={createCommentInputSchema}
        options={{
          defaultValues: {
            body: '',
            discussionId: discussionId,
          },
        }}
      >
        {({ register, formState }) => (
          <Textarea
            label="Body"
            error={formState.errors['body']}
            registration={register('body')}
          />
        )}
      </Form>
    </FormDrawer>
  );
};
