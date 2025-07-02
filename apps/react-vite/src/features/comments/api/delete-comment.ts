import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query';

import { getInfiniteCommentsQueryOptions } from './get-comments';
import diInit from './di';

var di = diInit();

export const deleteComment = ({ commentId }: { commentId: string }) => {
  return di.api.comment.deleteComment({ commentId });
};

type UseDeleteCommentOptions = {
  discussionId: string;
  mutationConfig?: MutationConfig<typeof deleteComment>;
};

export const useDeleteComment = ({
  mutationConfig,
  discussionId,
}: UseDeleteCommentOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions(discussionId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteComment,
  });
};
