package exchange_entity

type ImageFilter struct {
	Preset *ImagePreset
}

type ImageSort int

const (
	ImageSortDefault ImageSort = iota
	ImageSortCreatedAtAsc
	ImageSortCreatedAtDesc
)
