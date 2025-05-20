package exchange_entity

type DocumentFilter struct{}

type DocumentSort int

const (
	DocumentSortDefault DocumentSort = iota
	DocumentSortCreatedAtAsc
	DocumentSortCreatedAtDesc
)
