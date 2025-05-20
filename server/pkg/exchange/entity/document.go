package exchange_entity

import (
	"io"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Document struct {
	shared_entity.BaseDocument
	URL      string
	Path     string
	Title    string
	FileName string
	FileType string
	File     io.ReadSeeker
}
