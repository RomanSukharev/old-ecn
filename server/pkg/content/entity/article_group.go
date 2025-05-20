package content_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Группа статей базы знаний
type ArticleGroup struct {
	shared_entity.BaseDocument
	Title string // Заголовок группы
}

type ArticleGroups []ArticleGroup     // Массив групп статей
type ArticleGroupPtrs []*ArticleGroup // Массив указателей на группы статей
