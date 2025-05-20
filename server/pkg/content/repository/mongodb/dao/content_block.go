package content_mongodb_dao

import (
	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type ContentBlockDAO struct {
	Type      string                 `bson:"type,omitempty"`
	Data      map[string]interface{} `bson:"data,omitempty"`
	IsVisible bool                   `bson:"isVisible,omitempty"`
}

func (dao *ContentBlockDAO) FromEntity(entity content_entity.ContentBlock) *ContentBlockDAO {
	*dao = ContentBlockDAO{
		Type:      string(entity.Type),
		Data:      entity.Data,
		IsVisible: entity.IsVisible,
	}

	return dao
}

func (dao *ContentBlockDAO) ToEntity() *content_entity.ContentBlock {
	return &content_entity.ContentBlock{
		Type:      content_entity.ContentBlockType(dao.Type),
		Data:      dao.Data,
		IsVisible: dao.IsVisible,
	}
}
