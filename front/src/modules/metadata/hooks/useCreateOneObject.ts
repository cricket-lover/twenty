import { useMutation } from '@apollo/client';
import { getOperationName } from '@apollo/client/utilities';

import { MetadataObjectIdentifier } from '../types/MetadataObjectIdentifier';

import { useFindOneMetadataObject } from './useFindOneMetadataObject';

export const useCreateOneObject = ({
  objectNamePlural,
}: MetadataObjectIdentifier) => {
  const {
    foundMetadataObject,
    objectNotFoundInMetadata,
    findManyQuery,
    createOneMutation,
  } = useFindOneMetadataObject({
    objectNamePlural,
  });

  // TODO: type this with a minimal type at least with Record<string, any>
  const [mutate] = useMutation(createOneMutation);

  const createOneObject = foundMetadataObject
    ? (input: Record<string, any>) => {
        return mutate({
          variables: {
            input: {
              ...input,
            },
          },
          refetchQueries: [getOperationName(findManyQuery) ?? ''],
        });
      }
    : undefined;

  return {
    createOneObject,
    objectNotFoundInMetadata,
  };
};
