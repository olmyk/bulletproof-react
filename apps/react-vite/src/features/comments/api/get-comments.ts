import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import diInit from './di';
import { IComment } from '../model/IComment';
import { IMeta } from '../model/IMeta';

var di = diInit();

export const getComments = ({
  discussionId,
  page = 1,
}: {
  discussionId: string;
  page?: number;
}): Promise<{ data: IComment[]; meta: IMeta }> => {
  return di.api.comment.getComments({
    discussionId,
    page,
  });
};

export const getInfiniteCommentsQueryOptions = (discussionId: string) => {
  return infiniteQueryOptions({
    queryKey: ['comments', discussionId],
    queryFn: ({ pageParam = 1 }) => {
      return getComments({ discussionId, page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

type UseCommentsOptions = {
  discussionId: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getComments>;
};

export const useInfiniteComments = ({ discussionId }: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions(discussionId),
  });
};
