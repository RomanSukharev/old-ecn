package shared_entity

// Статус публикации
type PublicationStatus string

const (
	PublicationStatusDraft       PublicationStatus = "DRAFT"       // Черновик
	PublicationStatusPublished   PublicationStatus = "PUBLISHED"   // Опубликован
	PublicationStatusUnpublished PublicationStatus = "UNPUBLISHED" // Снят с публикации
)
