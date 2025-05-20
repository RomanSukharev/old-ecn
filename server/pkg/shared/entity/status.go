package shared_entity

type StatusCode string

// Первые две цифры-код слоя, третья и четвертая-код операции, остальные две-статус код операции
const (
	// Staff Codes-1
	StatusCodeStaffLoginOK               StatusCode = "STATUS_010100" // Успешный вход в систему
	StatusCodeStaffLoginDecodeError      StatusCode = "STATUS_010101" // Указанный email не найден
	StatusCodeStaffLoginInvalidPassword  StatusCode = "STATUS_010102" // Неверный пароль
	StatusCodeStaffLoginCreateTokenError StatusCode = "STATUS_010103" // Не удалось создать access token

	StatusCodeStaffLogoutOK StatusCode = "STATUS_010200" // Успеsшный выход из системы

	StatusCodeStaffEmployeeCreateOK             StatusCode = "STATUS_010300" // Успешное создание сотрудника
	StatusCodeStaffEmployeeCreateInsertOneError StatusCode = "STATUS_010301" // Ошибка при вставке нового сотрудника в базу данных
	StatusCodeStaffEmployeeCreateDecodeError    StatusCode = "STATUS_010302" // Ошибка декодирования данных нового сотрудника при создании

	StatusCodeStaffEmployeeUpdateOK             StatusCode = "STATUS_010400" // Успешное обновление сотрудника
	StatusCodeStaffEmployeeUpdateIDFromHexError StatusCode = "STATUS_010401" // Ошибка при конвертации ID
	StatusCodeStaffEmployeeUpdateDecodeError    StatusCode = "STATUS_010402" // Ошибка декодирования данных нового сотрудника при обновлении

	StatusCodeStaffEmployeeDeleteOK             StatusCode = "STATUS_010500" // Успешное удаление сотрудника
	StatusCodeStaffEmployeeDeleteIDFromHexError StatusCode = "STATUS_010501" // Ошибка при конвертации ID
	StatusCodeStaffEmployeeDeleteDeleteOneError StatusCode = "STATUS_010502" // Ошибка при удалении сотрудника из базы данных

	StatusCodeStaffEmployeeBulkDeleteOK              StatusCode = "STATUS_010600" // Успешное множественное удаление сотрудников
	StatusCodeStaffEmployeeBulkDeleteUpdateManyError StatusCode = "STATUS_010601" // Признак ошибки удаления сотрудника во время множественного удаления из базы данных
	StatusCodeStaffEmployeeBulkDeleteIDFromHexError  StatusCode = "STATUS_010602" // Ошибка при конвертации одного или всех ID

	StatusCodeStaffEmployeeBulkActivateOK              StatusCode = "STATUS_010700" // Успешная множественная активация/деактивации сотрудников
	StatusCodeStaffEmployeeBulkActivateIDFromHexError  StatusCode = "STATUS_010701" // Ошибка при конвертировании одного или всех ID
	StatusCodeStaffEmployeeBulkActivateUpdateManyError StatusCode = "STATUS_010702" // Признак ошибки активации/деактивации сотрудников и обновления их статуса в базе данных

	StatusCodeStaffEmployeeBulkPublishOK              StatusCode = "STATUS_010800" // Успешноая множественная смена статуса публикации сотрудников
	StatusCodeStaffEmployeeBulkPublishIDFromHexError  StatusCode = "STATUS_010801" // Ошибка при конвертировании одного или всех ID
	StatusCodeStaffEmployeeBulkPublishUpdateManyError StatusCode = "STATUS_010802" // Признак ошибки публикации сотрудников и обновления их статуса в базе данных

	StatusCodeStaffEmployeeBulkAssignRoleOK                   StatusCode = "STATUS_010900" // Успешное множественное назначение роли сотрудников
	StatusCodeStaffEmployeeBulkAssignRoleEntityIDFromHexError StatusCode = "STATUS_010901" // Ошибка при конвертировании одного или всех ID
	StatusCodeStaffEmployeeBulkAssignRoleRoleIDFromHexError   StatusCode = "STATUS_010902" // Ошибка при конвертации одного или все ID ролей
	StatusCodeStaffEmployeeBulkAssignRoleUpdateManyError      StatusCode = "STATUS_010903" // Признак ошибки назначение ролей и обновление их в базе данных

	StatusCodeStaffEmployeeBulkAssignDepartmentOK                       StatusCode = "STATUS_011000" // Успешное множественное назначение отдела сотрудникам
	StatusCodeStaffEmployeeBulkAssignDepartmentEntityIDFromHexError     StatusCode = "STATUS_011001" // Ошибка при конвертировании одного или всех ID
	StatusCodeStaffEmployeeBulkAssignDepartmentDepartmentIDFromHexError StatusCode = "STATUS_011002" // Ошибка при конвертировании одного или всех ID отдела
	StatusCodeStaffEmployeeBulkAssignDepartmentGroupIDFromHexError      StatusCode = "STATUS_011003" // Ошибка при конвертировании ID группы
	StatusCodeStaffEmployeeBulkAssignDepartmentUpdateManyError          StatusCode = "STATUS_011004" // Признак ошибки при назначении отдела/группы и обновление их в базе данных

	StatusCodeStaffPositionCreateOK             StatusCode = "STATUS_011100" // Успешное создание должности
	StatusCodeStaffPositionCreateInsertOneError StatusCode = "STATUS_011101" // Ошибка при создании должности в базе данных
	StatusCodeStaffPositionCreateDecodeError    StatusCode = "STATUS_011102" // Ошибка при декодировании созданной записи должности

	StatusCodeStaffPositionUpdateOK             StatusCode = "STATUS_011200" // Успешное обновление должности
	StatusCodeStaffPositionUpdateIDFromHexError StatusCode = "STATUS_011201" // Ошибка при конвертировании ID должности
	StatusCodeStaffPositionUpdateDecodeError    StatusCode = "STATUS_011202" // Ошибка при декодировании обновленной должности

	StatusCodeStaffPositionDeleteOK             StatusCode = "STATUS_011300" // Успешное удалении должности
	StatusCodeStaffPositionDeleteIDFromHexError StatusCode = "STATUS_011301" // Ошибка при конвертировании ID должности
	StatusCodeStaffPositionDeleteOneError       StatusCode = "STATUS_011302" // Ошибка при удалении должности из базы данных

	StatusCodeStaffPositionBulkDeleteOK              StatusCode = "STATUS_011400" // Успешное множественное удаление должностей
	StatusCodeStaffPositionBulkDeleteIDFromHexError  StatusCode = "STATUS_011401" // Ошибка при конвертировани одного или всех ID должностей
	StatusCodeStaffPositionBulkDeleteDeleteManyError StatusCode = "STATUS_011402" // Ошибка при множественном удалении должностей из базы данных

	StatusCodeStaffRoleCreateOK             StatusCode = "STATUS_011500" // Успешное создание роли
	StatusCodeStaffRoleCreateInsertOneError StatusCode = "STATUS_011501" // Ошибка при создании записи роли в базу данных
	StatusCodeStaffRoleCreateDecodeError    StatusCode = "STATUS_011502" // Ошибка при декодировании созданной записи роли

	StatusCodeStaffRoleUpdateOK             StatusCode = "STATUS_011600" // Успешное обновление роли
	StatusCodeStaffRoleUpdateIDFromHexError StatusCode = "STATUS_011601" // Ошибка при конвертировании ID роли
	StatusCodeStaffRoleUpdateDecodeError    StatusCode = "STATUS_011602" // Ошибка при декодировании обновленной записи роли

	StatusCodeStaffRoleDeleteOK             StatusCode = "STATUS_011700" // Успешное удаление роли
	StatusCodeStaffRoleDeleteIDFromHexError StatusCode = "STATUS_011701" // Ошибка при конвертации ID роли
	StatusCodeStaffRoleDeleteDeleteOneError StatusCode = "STATUS_011702" // Ошибка при удалении роли из базы данных

	StatusCodeStaffRoleBulkDeleteOK              StatusCode = "STATUS_011800" // Успешное множественное удаление ролей
	StatusCodeStaffRoleBulkDeleTeIDFromHexError  StatusCode = "STATUS_011801" // Ошибка при конвертировании одного или всех ID роли
	StatusCodeStaffRoleBulkDeleteDeleteManyError StatusCode = "STATUS_011802" // Ошибка при множественном удалении ролей

	StatusCodeStaffDepartmentCreateOK                   StatusCode = "STATUS_011900" // Успешное создание отдела
	StatusCodeStaffDepartmentCreateInsertOneError       StatusCode = "STATUS_011901" // Ошибка при создании записи отдела в базе данных
	StatusCodeStaffDepartmentGroupCreateInsertManyError StatusCode = "STATUS_011902" // Ошибка при создании групп внутри отдела в базе данных
	StatusCodeStaffDepartmentCreateDecodeError          StatusCode = "STATUS_011903" // Ошибка при декодировании записи нового отдела

	StatusCodeStaffDepartmentUpdateOK                   StatusCode = "STATUS_012000" // Успешное обновление отдела
	StatusCodeStaffDepartmentUpdateIDFromHexError       StatusCode = "STATUS_012001" // Ошибка при конвертировании
	StatusCodeStaffDepartmentUpdateDecodeOldError       StatusCode = "STATUS_012002" // Ошибка при декодировании старой записи отдела с группами
	StatusCodeStaffDepartmentUpdateFindGroupError       StatusCode = "STATUS_012003" // Ошибка получения записей групп из базы данных
	StatusCodeStaffDepartmentUpdateDecodeGroupError     StatusCode = "STATUS_012004" // Ошибка при декодировании записей групп
	StatusCodeStaffDepartmentUpdateDecodeError          StatusCode = "STATUS_012005" // Ошибка при декодировании обновленной записи отдела с группами в базе данных
	StatusCodeStaffDepartmentUpdateInsertOneGroupError  StatusCode = "STATUS_012006" // Ошибка вставки новой группы в базу данных
	StatusCodeStaffDepartmentUpdateUpdateByIDGroupError StatusCode = "STATUS_012007" // Ошибка при обновлении существующей группы в базе данных
	StatusCodeStaffDepartmentUpdateDeleteOneGroupError  StatusCode = "STATUS_012008" // Ошибка удаления старых групп из базы данных

	StatusCodeStaffDepartmentDeleteOK                   StatusCode = "STATUS_012100" // Успешное удаление отдела
	StatusCodeStaffDepartmentDeleteIDFromHexError       StatusCode = "STATUS_012101" // Ошибка при конвертировании ID отдела
	StatusCodeStaffDepartmentDeleteDeleteOneError       StatusCode = "STATUS_012102" // Ошибка при удалении записи отдела из базы данных
	StatusCodeStaffDepartmentDeleteDeleteManyGroupError StatusCode = "STATUS_012103" // Ошибка удаления записей групп внутри отдела из базы данных

	StatusCodeStaffDepartmentBulkDeleteOK                   StatusCode = "STATUS_012200" // Успешное множественное удаление отделов
	StatusCodeStaffDepartmentBulkDeleteIDFromHexError       StatusCode = "STATUS_012201" // Ошибка при конвертировании одного или всех ID отдела
	StatusCodeStaffDepartmentBulkDeleteDeleteManyError      StatusCode = "STATUS_012202" // Ошибка при множественном удалении отделов из базы данных
	StatusCodeStaffDepartmentBulkDeleteDeleteManyGroupError StatusCode = "STATUS_012203" // Ошибка удаления групп внутри отделов из базы данных

	// Estate Codes-2
	StatusCodeEstateComplexHouseCreateOK             StatusCode = "STATUS_020100" // Успешное создание новостройки
	StatusCodeEstateComplexHouseCreateInsertOneError StatusCode = "STATUS_020101" // Ошибка при вставке записи новостройки в базу данных
	StatusCodeEstateComplexHouseCreateDecodeError    StatusCode = "STATUS_020102" // Ошибка при декодировании созданной новостройки

	StatusCodeEstateComplexHouseUpdateOK             StatusCode = "STATUS_020200" // Успешное обновление новостройки
	StatusCodeEstateComplexHouseUpdateIDFromHexError StatusCode = "STATUS_020201" // Ошибка при конвертировании ID новостройки
	StatusCodeEstateComplexHouseUpdateDecodeError    StatusCode = "STATUS_020202" // Ошибка при декодировании обновленной записи новостройки

	StatusCodeEstateComplexHouseDeleteOK             StatusCode = "STATUS_020300" // Успешное удаление новостройки
	StatusCodeEstateComplexHouseDeleteIDFromHexError StatusCode = "STATUS_020301" // Ошибка при конвертировании ID новостройки
	StatusCodeEstateComplexHouseDocError             StatusCode = "STATUS_020302" // Ошибка обновления статус на isDeleted данной новостройки

	StatusCodeEstateComplexHouseBulkDeleteOK              StatusCode = "STATUS_020400" // Успешное множественное удаление новостроеек
	StatusCodeEstateComplexHouseBulkDeleteIDFromHexError  StatusCode = "STATUS_020401" // Ошибка при конвертировании одного или нескольких ID новостроеек
	StatusCodeEstateComplexHouseBulkDeleteUpdateManyError StatusCode = "STATUS_020402" // Ошибка при массовом обновлении статуса isDeleted новостроеек

	StatusCodeEstateComplexCreateOK             StatusCode = "STATUS_020500" // Успешное создание ЖК
	StatusCodeEstateComplexCreateInsertOneError StatusCode = "STATUS_020501" // Ошибка при вставке записи ЖК в базу данных
	StatusCodeEstateComplexCreateDecodeError    StatusCode = "STATUS_020502" // Ошибка при декодировании созданного ЖК

	StatusCodeEstateComplexUpdateOK             StatusCode = "STATUS_020600" // Успешное обновление ЖК
	StatusCodeEstateComplexUpdateIDFromHexError StatusCode = "STATUS_020601" // Ошибка при конвертировании ID ЖК
	StatusCodeEstateComplexUpdateDecodeError    StatusCode = "STATUS_020602" // Ошибка при декодировании обновленной записи ЖК

	StatusCodeEstateComplexDeleteOK             StatusCode = "STATUS_020700" // Успешное удаление ЖК
	StatusCodeEstateComplexDeleteIDFromHexError StatusCode = "STATUS_020701" // Ошибка при конвертировании ID ЖК
	StatusCodeEstateComplexDeleteDocError       StatusCode = "STATUS_020702" // Ошибка при обновлении статуса isDeleted ЖК

	StatusCodeEstateComplexBulkDeleteOK              StatusCode = "STATUS_020800" // Успешное множественное удаление ЖК
	StatusCodeEstateComplexBulkDeleteIDFromHexError  StatusCode = "STATUS_020801" // Ошибка при конвертировании одного или всех ID ЖК
	StatusCodeEstateComplexBulkDeleteUpdateManyError StatusCode = "STATUS_020802" // Ошибка при массовом обновлении статуса isDeleted ЖК

	StatusCodeEstateDeveloperCreateOK             StatusCode = "STATUS_020900" // Успешное создание застройщика
	StatusCodeEstateDeveloperCreateInsertOneError StatusCode = "STATUS_020901" // Ошибка при создании записи застройщика в базе данных
	StatusCodeEstateDeveloperCreateDecodeError    StatusCode = "STATUS_020902" // Ошибка при декодировании созданной записи застройщика

	StatusCodeEstateDeveloperUpdateOK             StatusCode = "STATUS_021000" // Успешное обновление застройщика
	StatusCodeEstateDeveloperUpdateIDFromHexError StatusCode = "STATUS_021001" // Ошибка при конвертировании ID застройщика
	StatusCodeEstateDeveloperUpdateDecodeError    StatusCode = "STATUS_021002" // Ошибка при декодировании обновленной записи застройщика

	StatusCodeEstateDeveloperDeleteOK             StatusCode = "STATUS_021100" // Успешное обновление застройщика
	StatusCodeEstateDeveloperDeleteIDFromHexError StatusCode = "STATUS_021101" // Ошибка при конвертировании ID застройщика
	StatusCodeEstateDeveloperDeleteDocError       StatusCode = "STATUS_021102" // Ошибка при обновлении статуса isDeleted у застройщика

	StatusCodeEstateDeveloperBulkDeleteOK              StatusCode = "STATUS_021200" // Успешное множественно удаление застройщика
	StatusCodeEsateDeveloperBulkDeleteIDFromHexError   StatusCode = "STATUS_021201" // Ошибка при конвертировании одного или нескольких ID застройщика
	StatusCodeEstateDeveloperBulkDeleteUpdateManyError StatusCode = "STATUS_021202" // Ошибка при массовом обноволении статуса isDeleted застройщика

	StatusCodeEstatePropertyCreateOK             StatusCode = "STATUS_021300" // Успешное создание объекта недвижимости
	StatusCodeEstatePropertyCreateInsertOneError StatusCode = "STATUS_021301" // Ошибка при создании записи объекта недвижимости в базе данных
	StatusCodeEstatePropertyCreateDecodeError    StatusCode = "STATUS_021302" // Ошибка при декодировании созданной записи объекта недвижимости

	StatusCodeEstatePropertyUpdateOK             StatusCode = "STATUS_021400" // Успешное обновление объекта недвижимости
	StatusCodeEstatePropertyUpdateIDFromHexError StatusCode = "STATUS_021401" // Ошибка при конвертировании ID объекта недвижимости
	StatusCodeEstatePropertyUpdateDecodeError    StatusCode = "STATUS_021402" // Ошибка при декодировании обновленной записи объекта недвижимости

	StatusCodeEstatePropertyDeleteOK             StatusCode = "STATUS_021500" // Успешное удаление объекта недвижимости
	StatusCodeEstatePropertyDeleteIDFromHexError StatusCode = "STATUS_021501" // Ошибка при конвертировании ID объекта недвижимости
	StatusCodeEstatePropertyDeleteDocError       StatusCode = "STATUS_021502" // Ошибка при обновлении статуса isDeleted объекта недвижимости

	StatusCodeEstatePropertyChangeStatusOK             StatusCode = "STATUS_021600" // Успешное обновление статуса объекта недвижимости
	StatusCodeEstatePropertyChangeStatusIDFromHexError StatusCode = "STATUS_021601" // Ошибка при конвертировании ID объекта недвижимости
	StatusCodeEstatePropertyChangeStatusDocError       StatusCode = "STATUS_021602" // Ошибка при обновлении статуса объекта недвижимости

	StatusCodeEstatePropertyRefreshOK             StatusCode = "STATUS_021700" // Успешное обновление актуальности объекта недвижимости
	StatusCodeEstatePropertyRefreshIDFromHexError StatusCode = "STATUS_021701" // Ошибка при конвертировании ID объекта недвижимости
	StatusCodeEstatePropertyRefreshDocError       StatusCode = "STATUS_021702" // Ошибка обновления актуальности объекта недвижимости

	StatusCodeEstatePropertyBulkDeleteOK              StatusCode = "STATUS_021800" // Успешное массовое удаление объектов недвижимости
	StatusCodeEstatePropertyBulkDeleteIDFromHexError  StatusCode = "STATUS_021801" // Ошибка при конвертировании одного или всех ID объекта недвижимости
	StatusCodeEstatePropertyBulkDeleteUpdateManyError StatusCode = "STATUS_021802" // Ошибка при массовом обновлении isDeleted объектов недвижимости

	StatusCodeEstatePropertyBulkChangeStatusOK              StatusCode = "STATUS_021900" // Успешное массовое обновление статуса объектов недвижимости
	StatusCodeEstatePropertyBulkChangeStatusIDFromHexError  StatusCode = "STATUS_021901" // Ошибка при конвертирвоании одного или всех ID объекта недвижимости
	StatusCodeEstatePropertyBulkChangeStatusUpdateManyError StatusCode = "STATUS_021902" // Ошибка при массовом обновлении cтатуса объектов недвижимости

	StatusCodeEstatePropertyBulkRefreshOK              StatusCode = "STATUS_022000" // Успешное обновление актуальности объекта недвижимости
	StatusCodeEstatePropertyBulkRefreshIDFromHexError  StatusCode = "STATUS_022001" // Ошибка при конвертировании одного или всех ID объекта недвижимости
	StatusCodeEstatePropertyBulkRefreshUpdateManyError StatusCode = "STATUS_022002" // Ошибка при массовом обновлении атуальности объекта недвижимости

	StatusCodeEstatePropertyUpdatePriceHistoryOK StatusCode = "STATUS_022100" // Успешное обновление истории цены у объекта недвижимости

	StatusCodeEstateVillageCreateOK             StatusCode = "STATUS_022200" // Успешное создание коттеджного поселка
	StatusCodeEstateVillageCreateInsertOneError StatusCode = "STATUS_022201" // Ошибка при создании новой записи коттеджного поселка в базе данных
	StatusCodeEstateVillageCreateDecodeError    StatusCode = "STATUS_022202" // Ошибка при декодировании созданного коттеджного поселка

	StatusCodeEstateVillageUpdateOK             StatusCode = "STATUS_022300" // Успешное обновление коттеджного поселка
	StatusCodeEstateVillageUpdateIDFromHexError StatusCode = "STATUS_022301" // Ошибка при конвертирвоании ID коттеджного поселка
	StatusCodeEstateVillageUpdateDecodeError    StatusCode = "STATUS_022302" // Ошибка при декодировании обновленной записи коттеджного поселка

	StatusCodeEstateVillageDeleteOK             StatusCode = "STATUS_022400" // Успешное удаление коттеджного поселка
	StatusCodeEstateVillageDeleteIDFromHexError StatusCode = "STATUS_022401" // Ошибка при конвертировании ID коттеджного поселка
	StatusCodeEstateVillageDeleteDocError       StatusCode = "STATUS_022402" // Ошибка при обновлении статуса isDeleted коттеджного поселка

	StatusCodeEstateVillageBulkDeleteOK              StatusCode = "STATUS_022500" // Успешное массовое удаление коттеджных поселков
	StatusCodeEstateVillageBulkDeleteIDFromHexError  StatusCode = "STATUS_022501" // Ошибка при конвертировании одного или всех ID коттеджного поселка
	StatusCodeEstateVillageBulkDeleteUpdateManyError StatusCode = "STATUS_022502" // Ошибка при массовом обновлении статуса isDeleted коттеджного поселка

	// Sales Codes-3
	StatusCodeSalesContactCreateOK             StatusCode = "STATUS_030100" // Успешное создание контакта
	StatusCodeSalesContactCreateInsertOneError StatusCode = "STATUS_030101" // Ошибка при создании записи контакта в базе данных
	StatusCodeSalesContactCreateDecodeError    StatusCode = "STATUS_030102" // Ошибка при декодировании созданной записи контакта

	StatusCodeSalesContactUpdateOK             StatusCode = "STATUS_030200" // Успешное обновление контакта
	StatusCodeSalesContactUpdateIDFromHexError StatusCode = "STATUS_030201" // Ошибка при конвертировании ID контакта
	StatusCodeSalesContactUpdateDecodeError    StatusCode = "STATUS_030202" // Ошибка при декодировании обновленной записи контакта

	StatusCodeSalesContactDeleteOK             StatusCode = "STATUS_030300" // Успешное удаление контакта
	StatusCodeSalesContactDeleteIDFromHexError StatusCode = "STATUS_030301" // Ошибка при конвертировании ID контакта
	StatusCodeSalesContactDeleteDocError       StatusCode = "STATUS_030302" // Ошибка при обновлении статуса isDeleted контакта

	StatusCodeSalesContactBulkDeleteOK              StatusCode = "STATUS_030400" // Успешное множественное удаление контактов
	StatusCodeSalesContactBulkDeleteIDFromHexError  StatusCode = "STATUS_030401" // Ошибка при конвертировании одного или всех ID контакта
	StatusCodeSalesContactBulkDeleteUpdateManyError StatusCode = "STATUS_030402" // Ошибка при массовом обновлении статуса isDeleted контактов

	StatusCodeSalesDealCreateOK             StatusCode = "STATUS_030500" // Успешное создание сделки
	StatusCodeSalesDealCreateInsertOneError StatusCode = "STATUS_030501" // Ошибка при вставки новой записи сделки в базу данных
	StatusCodeSalesDealCreateDecodeError    StatusCode = "STATUS_030502" // Ошибка при декодировании созданной записи сделки

	StatusCodeSalesDealUpdateOK             StatusCode = "STATUS_030600" // Успешное обновление сделки
	StatusCodeSalesDealUpdateIDFromHexError StatusCode = "STATUS_030601" // Ошибка при конвертировании ID сделки
	StatusCodeSalesDealUpdateDecodeError    StatusCode = "STATUS_030602" // Ошибка при декодировании обновленной сделки

	StatusCodeSalesDealDeleteOK             StatusCode = "STATUS_030700" // Успешное удаление сделки
	StatusCodeSalesDealDeleteIDFromHexError StatusCode = "STATUS_030701" // Ошибка при конвертировании ID сделки
	StatusCodeSalesDealDeleteDocError       StatusCode = "STATUS_030702" // Ошибка при обновлении статуса isDeleted у сделки

	StatusCodeSalesDealChangeStageOK             StatusCode = "STATUS_030800" // Успешное обновление стадии сделки
	StatusCodeSalesDealChangeStageIDFromHexError StatusCode = "STATUS_030801" // Ошибка при конвертировании ID сделки
	StatusCodeSalesDealChangeStageUpdateOneError StatusCode = "STATUS_030802" // Ошибка при обновлении стадии сдекли

	StatusCodeSalesDealBulkDeleteOK              StatusCode = "STATUS_030900" // Успешное множественное удаление сделок
	StatusCodeSalesDealBulkDeleteIDFromHexError  StatusCode = "STATUS_030901" // Ошибка при конвертировании одного или всех ID сделки
	StatusCodeSalesDealBulkDeleteUpdateManyError StatusCode = "STATUS_030902" // Ошибка при массовом обновлении статуса isDeleted сделок

	StatusCodeSalesDealBulkChangeStageOK              StatusCode = "STATUS_031000" // Успешное множественное обновлнеие стадии сделки
	StatusCodeSalesDealBulkChangeStageIDFromHexError  StatusCode = "STATUS_031001" // Ошибка при конвертировании одного или всех ID сделки
	StatusCodeSalesDealBulkChangeStageUpdateManyError StatusCode = "STATUS_031002" // Ошибка при массовом обновлении стадии сделки

	StatusCodeSalesLeadCreateOK             StatusCode = "STATUS_031100" // Успешное создание лида
	StatusCodeSalesLeadCreateInsertOneError StatusCode = "STATUS_031101" // Ошибка при создании записи лида в базе данных
	StatusCodeSalesLeadCreateDecodeError    StatusCode = "STATUS_031102" // Ошибка при декодирования созданной записи лида

	StatusCodeSalesLeadUpdateOK             StatusCode = "STATUS_031200" // Успешное обновление лида
	StatusCodeSalesLeadUpdateIDFromHexError StatusCode = "STATUS_031201" // Ошибка при конвертировании ID лида
	StatusCodeSalesLeadUpdateDecodeError    StatusCode = "STATUS_031202" // Ошибка при декодировании обновленного лида

	StatusCodeSalesLeadDeleteOK             StatusCode = "STATUS_031300" // Успешное удаление лида
	StatusCodeSalesLeadDeleteIDFromHexError StatusCode = "STATUS_031301" // Ошибка при конвертировании ID лида
	StatusCodeSalesLeadDeleteDocError       StatusCode = "STATUS_031302" // Ошибка при обновлении статуса isDeleted у лида

	StatusCodeSalesLeadChangeStatusOK             StatusCode = "STATUS_031400" // Успешное обновление статуса лида
	StatusCodeSalesLeadChangeStatusIDFromHexError StatusCode = "STATUS_031401" // Ошибка при конвертировании ID лида
	StatusCodeSalesLeadChangeStatusUpdateOneError StatusCode = "STATUS_031402" // Ошибка при обновлении статуса лида

	StatusCodeSalesLeadBulkDeleteOK              StatusCode = "STATUS_031500" // Успешное массовое обновление лидов
	StatusCodeSalesLeadBulkDeleteIDFromHexError  StatusCode = "STATUS_031501" // Ошибка при конвертировании одного или всех ID лида
	StatusCodeSalesLeadBulkDeleteUpdateManyError StatusCode = "STATUS_031502" // Ошибка при массовом обновлении статуса isDeleted лидов

	StatusCodeSalesLeadBulkChangeStatusOK              StatusCode = "STATUS_031600" // Успешное массовое обновление статуса лидов
	StatusCodeSalesLeadBulkChangeStatusIDFromHexError  StatusCode = "STATUS_031601" // Ошибка при конвертировании одного или всех ID лидов
	StatusCodeSalesLeadBulkChangeStatusUpdateManyError StatusCode = "STATUS_031602" // Ошибка при массовом обновлении статуса лида

	StatusCodeSalesMeetCreateOK       StatusCode = "STATUS_031700" // Успешное создание встречи
	StatusCodeSalesMeetInsertOneError StatusCode = "STATUS_031701" // Ошибка при создании записи встречи в базе данных
	StatusCodeSalesMeetDecodeError    StatusCode = "STATUS_031702" // Ошибка при декодировании созданной встречи

	StatusCodeSalesMeetUpdateOK             StatusCode = "STATUS_031800" // Успешное обновление встречи
	StatusCodeSalesMeetUpdateIDFromHexError StatusCode = "STATUS_031801" // Ошибка при конвертировании ID встречи
	StatusCodeSalesMeetUpdateDecodeError    StatusCode = "STATUS_031802" // Ошибка при декодировании обновленной встречи

	StatusCodeSalesMeetDeleteOK             StatusCode = "STATUS_031900" // Успешное удаление встречи
	StatusCodeSalesMeetDeleteIDFromHexError StatusCode = "STATUS_031901" // Ошибка при конвертировании ID встречи
	StatusCodeSalesMeetDeleteDocError       StatusCode = "STATUS_031902" // Ошибка при обновлении статуса isDeleted встречи

	StatusCodeSalesMeetChangeStatusOK             StatusCode = "STATUS_032000" // Успешная смена статуса у встречи
	StatusCodeSalesMeetChangeStatusIDFromHexError StatusCode = "STATUS_032001" // Ошибка при конвертировании ID встречи
	StatusCodeSalesMeetChangeStatusUpdateOneError StatusCode = "STATUS_032002" // Ошибка при смене статуса у встречи

	StatusCodeSalesMeetBulkDeleteOK              StatusCode = "STATUS_032100" // Успешное множественное удаление встреч
	StatusCodeSalesMeetBulkDeleteIDFromHexError  StatusCode = "STATUS_032101" // Ошибка при конвертировании одного или всех ID встречи
	StatusCodeSalesMeetBulkDeleteUpdateManyError StatusCode = "STATUS_032102" // Ошибка при множественном обновлении статуса isDeleted у встреч

	StatusCodeSalesMeetBulkChangeStatusOK              StatusCode = "STATUS_032200" // Успешное множетсвенная смена статуса у встреч
	StatusCodeSalesMeetBulkChangeStatusIDFromHexError  StatusCode = "STATUS_032201" // Ошибка при конвертировании одного или всех ID встречи
	StatusCodeSalesMeetBulkChangeStatusUpdateManyError StatusCode = "STATUS_032202" // Ошибка при множественной смене статуса у встреч

	StatusCodeSalesTaskCreateOK             StatusCode = "STATUS_032300" // Успешное создание задания
	StatusCodeSalesTaskCreateInsertOneError StatusCode = "STATUS_032301" // Ошибка при создании записи задания в базе данных
	StatusCodeSalesTaskCreateDecodeError    StatusCode = "STATUS_032302" // Ошибка при декодировании созданной записи задания

	StatusCodeSalesTaskUpdateOK             StatusCode = "STATUS_032400" // Успешное обновление задания
	StatusCodeSalesTaskUpdateIDFromHexError StatusCode = "STATUS_032401" // Ошибка при конвертировании ID задания
	StatusCodeSalesTaskUpdateDecodeError    StatusCode = "STATUS_032402" // Ошибка при декодировании обновленной записи задания

	StatusCodeSalesTaskDeleteOK             StatusCode = "STATUS_032500" // Успешное удаление задания
	StatusCodeSalesTaskDeleteIDFromHexError StatusCode = "STATUS_032501" // Ошибка при конвертировании ID задания
	StatusCodeSalesTaskDeleteDocError       StatusCode = "STATUS_032502" // Ошибка при обновлении статуса isDeleted у задания

	StatusCodeSalesTaskCompleteOK             StatusCode = "STATUS_032600" // Успешное выполнение задания
	StatusCodeSalesTaskCompleteIDFromHexError StatusCode = "STATUS_032601" // Ошибка при конвертировании ID задания
	StatusCodeSalesTaskCompleteUpdateOneError StatusCode = "STATUS_032602" // Ошибка при обновлении статуса isCompleted у задания

	StatusCodeSalesTaskBulkDeleteOK              StatusCode = "STATUS_032700" // Успешное множественное удаление заданий
	StatusCodeSalesTaskBulkDeleteIDFromHexError  StatusCode = "STATUS_032701" // Ошибка при конвертировании одного или всех ID заданий
	StatusCodeSalesTaskBulkDeleteUpdateManyError StatusCode = "STATUS_032702" // Ошибка при обновлении статуса isDeleted у заданий

	StatusCodeSalesTaskBulkCompleteOK              StatusCode = "STATUS_032800" // Успешное множественное выполнение заданий
	StatusCodeSalesTaskBulkCompleteIDFromHexError  StatusCode = "STATUS_032801" // Ошибка при конвертировании одного или всех ID заданий
	StatusCodeSalesTaskBulkCompleteUpdateManyError StatusCode = "STATUS_032802" // Ошибка при обновлении статуса isCompleted у заданий

	StatusCodeSalesMortgageRequestCreateOK             StatusCode = "STATUS_032900" // Успешное создание ипотечной заявки
	StatusCodeSalesMortgageRequestCreateInsertOneError StatusCode = "STATUS_032901" // Ошибка при создании записи ипотечной заявки в базе данных
	StatusCodeSalesMortgageRequestCreateDecodeError    StatusCode = "STATUS_032902" // Ошибка при декодировании созданной записи ипотечной заявки

	StatusCodeSalesMortgageRequestUpdateOK             StatusCode = "STATUS_033000" // Успешное обновление ипотечной заявки
	StatusCodeSalesMortgageRequestUpdateIDFromHexError StatusCode = "STATUS_033001" // Ошибка при конвертировании ID ипотечной заявки
	StatusCodeSalesMortgageRequestUpdateDecodeError    StatusCode = "STATUS_033002" // Ошибка при декодировании обновленной записи ипотечной заявки

	StatusCodeSalesMortgageRequestDeleteOK             StatusCode = "STATUS_033100" // Успешное удаление ипотечной заявки
	StatusCodeSalesMortgageRequestDeleteIDFromHexError StatusCode = "STATUS_033101" // Ошибка при конвертировании ID ипотечной заявки
	StatusCodeSalesMortgageRequestDeleteDocError       StatusCode = "STATUS_033102" // Ошибка при обновлении статуса isDeleted у ипотечной заявки

	StatusCodeSalesMortgageRequestChangeStatusOK             StatusCode = "STATUS_033200" // Успешная смена статуса ипотечной заявки
	StatusCodeSalesMortgageRequestChangeStatusIDFromHexError StatusCode = "STATUS_033201" // Ошибка при конвертировании ID ипотечной заявки
	StatusCodeSalesMortgageRequestChangeStatusUpdateOneError StatusCode = "STATUS_033202" // Ошибка при смене статуса status у ипотечной заявки

	StatusCodeSalesMortgageRequestBulkDeleteOK              StatusCode = "STATUS_033300" // Успешное множественное удаление ипотечных заявок
	StatusCodeSalesMortgageRequestBulkDeleteIDFromHexError  StatusCode = "STATUS_033301" // Ошибка при конвертировании одного или всех ID ипотечной заявки
	StatusCodeSalesMortgageRequestBulkDeleteUpdateManyError StatusCode = "STATUS_033302" // Ошибка при множественном обновлении статуса isDeleted у ипотечных заявок

	StatusCodeSalesMortgageRequestBulkChangeStatusOK              StatusCode = "STATUS_033400" // Успешная множественная смена статуса ипотечных заявок
	StatusCodeSalesMortgageRequestBulkChangeStatusIDFromHexError  StatusCode = "STATUS_033401" // Ошибка при конвертировании ID ипотечной заявки
	StatusCodeSalesMortgageRequestBulkChangeStatusUpdateManyError StatusCode = "STATUS_033402" // Ошибка при множественном обновлении статуса status у ипотечных заявок
)
