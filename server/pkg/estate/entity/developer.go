package estate_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Застройщик
type Developer struct {
	shared_entity.BaseDocument

	Title  *string // Наименование застройщика
	LogoID *string // Идентификатор изображения логотипа застройщика
	URL    *string // Официальный сайт застройщика

	IsDeleted *bool // Признак удаления
}

type Developers []Developer
type DeveloperPtrs []*Developer
