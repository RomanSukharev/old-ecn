package system_entity

// Фильтр системного журнала
type LogFilter struct {
	AuthorID *string   // Идентификатор автора события
	Type     *LogType  // Тип события
	Level    *LogLevel // Уровень события
	Keyword  *string   // Ключевое слово для полнотекстового поиска
}

type LogSort int // Сортировка системного журнала

const (
	LogSortDefault       LogSort = iota // Сортировка по умолчанию (не задана)
	LogSortCreatedAtAsc                 // Сортировка по дате создания (по возрастанию)
	LogSortCreatedAtDesc                // Сортировка по дате создания (по убыванию)
)
