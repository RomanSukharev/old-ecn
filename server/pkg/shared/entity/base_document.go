package shared_entity

import "time"

type BaseDocument struct {
	ID        string    // Уникальный идентификатор
	CreatedAt time.Time // Дата и время создания
	UpdatedAt time.Time // Дата и время обновления
}
