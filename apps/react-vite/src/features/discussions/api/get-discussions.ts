import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';

import diInit from './di';
import { IDiscussion } from '../model/IDiscussion';
import { IMeta } from '../model/IMeta';

var di = diInit();

export const getDiscussions = (
  page = 1,
): Promise<{
  data: IDiscussion[];
  meta: IMeta;
}> => {
  return di.api.discussion.getDiscussions(page);
};

export const getDiscussionsQueryOptions = ({
  page,
}: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['discussions', { page }] : ['discussions'],
    queryFn: () => getDiscussions(page),
  });
};

type UseDiscussionsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getDiscussionsQueryOptions>;
};

export const useDiscussions = ({
  queryConfig,
  page,
}: UseDiscussionsOptions) => {
  return useQuery({
    ...getDiscussionsQueryOptions({ page }),
    ...queryConfig,
  });
};
