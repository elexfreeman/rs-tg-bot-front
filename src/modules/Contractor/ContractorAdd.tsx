import { Group } from '@vkontakte/vkui';
import { ContractorI } from 'src/api/contractor_api';
import { ContractorAddEditForm } from 'src/modules/Contractor/ContractorAddEditForm';

export const ContractorAdd = () => {
  const newEntity: ContractorI = {
    id: 0,
    caption: '',
    description: '',
  };

  return (
    <Group description="">
      <ContractorAddEditForm contractor={newEntity} />
    </Group>
  );
};

ContractorAdd.displayName = 'ContractorAdd';
