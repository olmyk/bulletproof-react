import { useQuery, queryOptions } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';

import diInit from './di';
import { IDiscussion } from '../model/IDiscussion';

var di = diInit();

export const getDiscussion = ({
  discussionId,
}: {
  discussionId: string;
}): Promise<{ data: IDiscussion }> => {
  return di.api.discussion.getDiscussion({ discussionId });
};

export const getDiscussionQueryOptions = (discussionId: string) => {
  return queryOptions({
    queryKey: ['discussions', discussionId],
    queryFn: () => getDiscussion({ discussionId }),
  });
};

type UseDiscussionOptions = {
  discussionId: string;
  queryConfig?: QueryConfig<typeof getDiscussionQueryOptions>;
};

export const useDiscussion = ({
  discussionId,
  queryConfig,
}: UseDiscussionOptions) => {
  return useQuery({
    ...getDiscussionQueryOptions(discussionId),
    ...queryConfig,
  });
};
