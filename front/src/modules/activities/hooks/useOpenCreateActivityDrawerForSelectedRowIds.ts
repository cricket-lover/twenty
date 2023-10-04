import { useRecoilValue } from 'recoil';

import { selectedRowIdsSelector } from '@/ui/data-table/states/selectors/selectedRowIdsSelector';
import { ActivityType } from '~/generated/graphql';

import {
  ActivityTargetableEntity,
  ActivityTargetableEntityType,
} from '../types/ActivityTargetableEntity';

import { useOpenCreateActivityDrawer } from './useOpenCreateActivityDrawer';

export const useOpenCreateActivityDrawerForSelectedRowIds = () => {
  const selectedRowIds = useRecoilValue(selectedRowIdsSelector);

  const openCreateActivityDrawer = useOpenCreateActivityDrawer();

  return (
    type: ActivityType,
    entityType: ActivityTargetableEntityType,
    relatedEntities?: ActivityTargetableEntity[],
  ) => {
    let activityTargetableEntityArray: ActivityTargetableEntity[] =
      selectedRowIds.map((id) => ({
        type: entityType,
        id,
      }));
    if (relatedEntities) {
      activityTargetableEntityArray =
        activityTargetableEntityArray.concat(relatedEntities);
    }
    openCreateActivityDrawer({
      type,
      targetableEntities: activityTargetableEntityArray,
    });
  };
};
