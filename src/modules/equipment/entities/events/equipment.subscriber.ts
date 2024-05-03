import { AfterInsert, AfterUpdate, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { EquipmentHistoryEntity }                                                                         from '@modules/equipment/entities/equipment-history.entity';
import { EquipmentEntity }                                                                                from '@modules/equipment/entities/equipment.entity';
import { isDate }                                                                                         from 'class-validator';

@EventSubscriber()
export class EquipmentSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return EquipmentEntity;
  }

  @AfterInsert()
  async afterInsert(event: InsertEvent<any>) {
    const {entity, manager} = event;

    const historyRepository = manager.getRepository(EquipmentHistoryEntity);
    const tempHistory: EquipmentHistoryEntity = historyRepository.create({
      equipoId: entity.id,
      usuarioIdCreacion: entity.usuarioIdCreacion,
      descripcion: 'Equipo creado',
    });

    await historyRepository.save(tempHistory);
  }

  @AfterUpdate()
  async afterUpdate(event: UpdateEvent<any>) {
    const {entity, manager, databaseEntity, updatedColumns} = event;

    if (updatedColumns && updatedColumns.length > 0) {
      let description = 'Equipo actualizado: ';

      for (const updatedColumn of updatedColumns) {
        let currentValue = entity[updatedColumn.propertyName];
        let previousValue = databaseEntity[updatedColumn.propertyName];

        if (isDate(previousValue))
          previousValue = previousValue.toISOString();
        if (isDate(currentValue))
          currentValue = currentValue.toISOString();

        description += `\n${ updatedColumn.propertyPath } cambió de ${ previousValue } a ${ currentValue }. `;
      }

      const historyRepository = manager.getRepository(EquipmentHistoryEntity);

      const tempHistory: EquipmentHistoryEntity = historyRepository.create({
        equipoId: entity.id,
        usuarioIdCreacion: entity.usuarioIdCreacion,
        descripcion: description.trim(),
      });

      await historyRepository.save(tempHistory);
    }
  }

  // @BeforeSoftRemove()
  // afterSoftRemove(event: SoftRemoveEvent<any>) {
  //   const {entity, manager} = event;
  //   console.log('Soft remove event', event);
  //
  //   const historyRepository = manager.getRepository(EquipmentHistoryEntity);
  //   const tempHistory: EquipmentHistoryEntity = historyRepository.create({
  //     equipoId: entity.id,
  //     usuarioIdCreacion: entity.usuarioIdCreacion,
  //     descripcion: 'Equipo eliminado',
  //   });
  //
  //   historyRepository.save(tempHistory);
  // }
}
