package content_entity

// Фильтр групп статей базы знаний
type ArticleGroupFilter struct {
	Keyword *string // Ключевое слово для полнотекстового поиска
}

type ArticleGroupSort int // Сортировка групп

const (
	ArticleGroupSortDefault   ArticleGroupSort = iota // Сортировка по умолчанию (не задана)
	ArticleGroupSortTitleAsc                          // Сортировка по заголовку (по возрастанию)
	ArticleGroupSortTitleDesc                         // Сортировка по заголовку (по убыванию)
)
