package content_entity

// Фильтр откликов на вакансии
type VacancyRequestFilter struct {
	VacancyID *string               // Идентификатор вакансии
	Status    *VacancyRequestStatus // Статус отклика
	Keyword   *string               // Ключевое слово для полнотекстового поиска
}

type VacancyRequestSort int // Сортировка откликов на вакансии

const (
	VacancyRequestSortDefault       VacancyRequestSort = iota // Сортировка по умолчанию (не задана)
	VacancyRequestSortCreatedAtAsc                            // Сортировка по дате создания (по возрастанию)
	VacancyRequestSortCreatedAtDesc                           // Сортировка по дате создания (по убыванию)
)
