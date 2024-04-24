import {
  AfterInsert,
  AfterSoftRemove,
  AfterUpdate,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent
}                                 from 'typeorm';
import { EquipmentHistoryEntity } from '@modules/equipment/entities/equipment-history.entity';
import { EquipmentEntity }        from '@modules/equipment/entities/equipment.entity';

@EventSubscriber()
export class EquipmentSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return EquipmentEntity;
  }

  @AfterInsert()
  async afterInsert(event: InsertEvent<any>) {
    const {entity, manager} = event;

    console.log('Entity:', entity);
    const historyRepository = manager.getRepository(EquipmentHistoryEntity);
    const tempHistory: EquipmentHistoryEntity = historyRepository.create({
      equipoId: entity.id,
      usuarioIdCreacion: entity.usuarioIdCreacion,
      descripcion: 'Equipo creado',
    });

    const savedHistory = await historyRepository.save(tempHistory);
    console.log('Saved history:', savedHistory);
  }

  @AfterUpdate()
  afterUpdate(event: UpdateEvent<any>) {
    const {entity, manager} = event;

    const historyRepository = manager.getRepository(EquipmentHistoryEntity);
    const tempHistory: EquipmentHistoryEntity = historyRepository.create({
      equipoId: entity.id,
      usuarioIdCreacion: entity.usuarioIdCreacion,
      descripcion: 'Equipo actualizado',
    });

    historyRepository.save(tempHistory);
  }

  @AfterSoftRemove()
  afterSoftRemove(event: SoftRemoveEvent<any>) {
    const {entity, manager} = event;

    const historyRepository = manager.getRepository(EquipmentHistoryEntity);
    const tempHistory: EquipmentHistoryEntity = historyRepository.create({
      equipoId: entity.id,
      usuarioIdCreacion: entity.usuarioIdCreacion,
      descripcion: 'Equipo eliminado',
    });

    historyRepository.save(tempHistory);
  }
}
