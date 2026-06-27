import { MemberPowerTag } from '../../types/matrix/room';

const DEFAULT_TAG: MemberPowerTag = {
  name: 'Owner',
  color: '#fdff00',
};

export const useRoomCreatorsTag = (): MemberPowerTag => DEFAULT_TAG;
