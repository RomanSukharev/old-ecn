package exchange_entity

import (
	"io"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Image struct {
	shared_entity.BaseDocument
	URL         string
	Path        string
	Title       string
	FileName    string
	FileType    string
	PreviewURL  string
	PreviewPath string
	BlurHash    string
	Preset      ImagePreset
	File        io.ReadSeeker
}

type ImagePreset string

const (
	ImagePresetStaffEmployeeAvatar      ImagePreset = "STAFF_EMPLOYEE_AVATAR"
	ImagePresetStaffEmployeePublicImage ImagePreset = "STAFF_EMPLOYEE_PUBLIC_IMAGE"
	ImagePresetContentKbArticleCover    ImagePreset = "CONTENT_KB_ARTICLE_COVER"
	ImagePresetContentSiteStoryCover    ImagePreset = "CONTENT_SITE_STORY_COVER"
	ImagePresetContentSiteStoryPhoto    ImagePreset = "CONTENT_SITE_STORY_PHOTO"
	ImagePresetEstatePropertyPhoto      ImagePreset = "ESTATE_PROPERTY_PHOTO"
	ImagePresetEstateComplexPhoto       ImagePreset = "ESTATE_COMPLEX_PHOTO"
)
