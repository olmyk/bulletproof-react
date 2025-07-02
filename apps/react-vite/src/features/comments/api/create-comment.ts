import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';

import { getInfiniteCommentsQueryOptions } from './get-comments';
import diInit from './di';
import { IComment } from '../model/IComment';

var di = diInit();

export const createCommentInputSchema = z.object({
  discussionId: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;

export const createComment = ({
  data,
}: {
  data: CreateCommentInput;
}): Promise<IComment> => {
  return di.api.comment.createComment({ data });
};

type UseCreateCommentOptions = {
  discussionId: string;
  mutationConfig?: MutationConfig<typeof createComment>;
};

export const useCreateComment = ({
  mutationConfig,
  discussionId,
}: UseCreateCommentOptions) => {
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
    mutationFn: createComment,
  });
};
